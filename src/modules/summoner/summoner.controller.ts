import {
  Body,
  Post,
  Get,
  Param,
  Controller,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { GetCurrentUserId, Public } from 'src/decorators';
import {
  getAllServersFromRoutingPlatforms,
  getRegionFromRoutingPlatform,
  getServerFromRoutingPlatform,
} from 'src/utils';
import { SummonerDto } from './dto';

import { SummonerService } from './summoner.service';

const endpoint = 'summoner';

@Controller()
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  // return all the possible summoners
  @Public()
  @Get(`${endpoint}s/:name`)
  @HttpCode(200)
  async getSummonersByName(
    @Param('name') summonerName: string,
  ): Promise<Array<object>> {
    try {
      console.log('getSummonersByName');
      const summoners = await this.summonerService.getSummonersByName(
        summonerName,
      );
      return summoners;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @Get(`${endpoint}/${endpoint}ByName/:name/:platform`)
  @HttpCode(200)
  async getSummonerByName(
    @Param('name') summonerName: string,
    @Param('platform') platform: string,
  ): Promise<object> {
    try {
      const riotRoutingPlatforms: string[] =
        getAllServersFromRoutingPlatforms();
      const server: string = getServerFromRoutingPlatform(platform);
      const region: string = getRegionFromRoutingPlatform(platform);
      if (!riotRoutingPlatforms.includes(server))
        throw new HttpException('Invalid platform', 400);

      const summoner = await this.summonerService.getSummonerByName(
        summonerName,
        server,
        region,
      );
      return summoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @Get(`${endpoint}/${endpoint}ById/:id/:platform`)
  @HttpCode(200)
  async getSummonerByIdAndPlatform(
    @Param('id') summonerId: string,
    @Param('platform') platform: string,
  ): Promise<object> {
    try {
      const riotRoutingPlatforms: string[] =
        getAllServersFromRoutingPlatforms();
      const server: string = getServerFromRoutingPlatform(platform);
      const region: string = getRegionFromRoutingPlatform(platform);

      if (!riotRoutingPlatforms.includes(server))
        throw new HttpException('Invalid platform', 400);
      const summoner = await this.summonerService.getSummonerByIdAndPlatform(
        summonerId,
        server,
        region,
      );
      return summoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post(`${endpoint}/create`)
  @HttpCode(201)
  async createSummoner(
    @GetCurrentUserId() userId: string,
    @Body() dto: SummonerDto,
  ): Promise<object> {
    try {
      const summoner: object = await this.summonerService.createSummoner(
        userId,
        dto,
      );
      return summoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // refactor update to single summmoner
  @Get(`${endpoint}/update/:summonerId`)
  @HttpCode(200)
  async getSummonerUpdates(
    @GetCurrentUserId() userId: string,
    @Param('summonerId') summonerId: string,
  ): Promise<object> {
    try {
      const dbSummoner: object =
        await this.summonerService.findSummonerBySummonerId(userId, summonerId);
      const fetchedSummoner: object =
        await this.summonerService.getSummonerByIdAndPlatform(
          summonerId,
          dbSummoner['server'],
          dbSummoner['region'],
        );
      // const updatedSummoners: Array<object> =
      //   await this.summonerService.compareAndUpdateSummoners(
      //     dbSummoners,
      //     fetchedSummoners,
      //   );
      return dbSummoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
