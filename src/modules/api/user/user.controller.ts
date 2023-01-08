import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpException,
  Post,
  HttpStatus,
  Body,
  Delete,
} from '@nestjs/common';

import { isBeforeOrEqual } from 'src/utils/date.util';

import { GetCurrentUserId } from 'src/decorators';

// INTERFACES
import { PublicUser } from 'src/interfaces/user/user.interface';
import { RedisService } from 'src/redis/redis.service';

import { UserService } from './user.service';
import { SummonerService } from '../summoner/summoner.service';
import { SummonerRdoService } from 'src/modules/rdo/summoner/summoner.service';
import { LinkDto } from './dto';

import { CreateSummoner } from 'src/interfaces/summoner/summoner.interface';

import { getServerAndRegion } from 'src/utils';
import { SummonerBuilder } from 'src/builders/summoner/summoner.builder';

const endpoint = 'user';

enum LinkRequestStatus {
  NOT_FOUND = 'Summoner not found',
  ALREADY_LINKED = 'Summoner already linked to user',
  ALREADY_LINKED_OTHER_USER = 'Summoner already linked to another user',
  NOT_VERIFIED = 'Summoner not verified',
  REDIS_NOT_FOUND = 'Redis key not found',
}
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
    private readonly summonerService: SummonerService,
    private readonly summonerRdoService: SummonerRdoService,
  ) {}

  @Get(`${endpoint}/me`)
  @HttpCode(200)
  async me(@GetCurrentUserId() userId: string): Promise<PublicUser> {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(`${endpoint}/:id`)
  @HttpCode(200)
  async getUserById(@Param('id') userId: string): Promise<PublicUser> {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post(`${endpoint}/link-request`)
  @HttpCode(HttpStatus.OK)
  async linkRequest(
    @Body() dto: LinkDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);

      const summoner = await this.summonerService.getSummonerByPuuid(
        dto.summonerPuuid,
      );

      if (summoner?.userId && summoner.userId === userId) {
        throw new HttpException(LinkRequestStatus.ALREADY_LINKED, 400);
      } else if (summoner?.userId && summoner.userId !== userId) {
        throw new HttpException(
          LinkRequestStatus.ALREADY_LINKED_OTHER_USER,
          400,
        );
      } else {
        const summonerFromRdo =
          await this.summonerRdoService.getSummonerByPuuidAndPlatform(
            dto.summonerPuuid,
            dto.platform,
          );
        if (!summonerFromRdo)
          throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);
        await this.redisService.set(userId, summonerFromRdo, {
          ttl: process.env.REDIS_EXPIRATION_TIME,
        });
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post(`${endpoint}/link/`)
  @HttpCode(HttpStatus.CREATED)
  async linkSummonerToUser(
    @Body() dto: LinkDto,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    try {
      const { server, region } = getServerAndRegion(dto);

      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);

      const redisSummonerReference = await this.redisService.get(userId);
      if (!redisSummonerReference)
        throw new HttpException(LinkRequestStatus.REDIS_NOT_FOUND, 404);

      const summonerFromRdo =
        await this.summonerRdoService.getSummonerByPuuidAndPlatform(
          dto.summonerPuuid,
          dto.platform,
        );
      if (!summonerFromRdo)
        throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);
      if (
        isBeforeOrEqual(
          summonerFromRdo.revisionDate.toString(),
          redisSummonerReference.revisionDate,
        ) ||
        summonerFromRdo.profileIconId === redisSummonerReference.profileIconId
      ) {
        throw new HttpException(LinkRequestStatus.NOT_VERIFIED, 400);
      } else {
        const summoner: CreateSummoner = SummonerBuilder.aSummoner()
          .withServer(server)
          .withRegion(region)
          .withId(summonerFromRdo.summonerId)
          .withAccountId(summonerFromRdo.accountId)
          .withName(summonerFromRdo.name)
          .withLevel(summonerFromRdo.summonerLevel)
          .withPuuid(summonerFromRdo.puuid)
          .withProfileIconId(summonerFromRdo.profileIconId)
          .withRevisionDate(summonerFromRdo.revisionDate)
          .build();

        await this.summonerService.createOrUpdateSummoner(summoner, user);
        await this.userService.linkSummonerToUser(
          userId,
          summonerFromRdo.summonerId,
        );
        await this.redisService.del(userId);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(`${endpoint}/unlink/:summonerId`)
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlinkSummonerFromUser(
    @Param('summonerId') summonerId: string,
    @GetCurrentUserId() userId: string,
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);

      const summoner = await this.summonerService.getSummonerById(summonerId);
      if (
        !user.summoners.filter((summoner) => summoner.summonerId === summonerId)
          .length
      )
        throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);

      if (summoner.userId !== userId)
        throw new HttpException(LinkRequestStatus.NOT_FOUND, 404);

      await this.userService.unlinkSummonerFromUser(user, summonerId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
