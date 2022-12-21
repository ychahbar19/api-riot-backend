import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Summoner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  getAllRoutingPlatform,
  getRegionFromRoutingPlatform,
  getServerFromRoutingPlatform,
} from 'src/utils';

import { SummonerRequestDto } from './dto';
import { SummonerDto } from '../../../interfaces/dto/v4/summoner.dto';
import { SummonerResponse } from 'src/interfaces/summoner/summoner.interface';

@Injectable()
export class SummonerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  // async createSummoner(
  //   userId: string,
  //   summoner: SummonerRequestDto,
  // ): Promise<object> {
  //   try {
  //     // TODO: fix prisma type data error
  //     const data: any = {
  //       userId,
  //       ...summoner,
  //     };
  //     const newSummoner: any = await this.prisma.summoner.create({
  //       data,
  //     });
  //     return newSummoner;
  //   } catch (error) {
  //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (error.code === 'P2002') {
  //         throw new HttpException(
  //           'Summoner already exists',
  //           HttpStatus.CONFLICT,
  //         );
  //       }
  //     }
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async findSummonerBySummonerId(
  //   userId: string,
  //   summonerId: string,
  // ): Promise<object> {
  //   try {
  //     const summoner = await this.prisma.summoner.findUnique({
  //       where: {
  //         id: summonerId,
  //       },
  //       // include: {
  //       //   user: true,
  //       // },
  //     });
  //     if (summoner.userId !== userId) {
  //       throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //     }
  //     return summoner;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async findManySummoners(userId: string): Promise<Array<object>> {
  //   try {
  //     const summoners = await this.prisma.summoner.findMany({
  //       where: {
  //         userId,
  //       },
  //     });
  //     return summoners;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async getSummonersBySummonerName(
  //   summoners: Array<object>,
  // ): Promise<Array<object>> {
  //   try {
  //     const summonersData = [];
  //     await Promise.all(
  //       summoners.map(async (summoner: object) => {
  //         try {
  //           const summonerData = await this.getSummonerByName(
  //             summoner['name'],
  //             summoner['server'],
  //             summoner['region'],
  //           );
  //           summonersData.push({
  //             server: summoner['server'],
  //             region: summoner['region'],
  //             ...summonerData,
  //           });
  //         } catch (error) {
  //           throw new HttpException(error.message, error.status);
  //         }
  //       }),
  //     );
  //     return summonersData;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // async compareAndUpdateSummoners(
  //   dbSummoners: Array<object>,
  //   fetchedSummoners: Array<object>,
  // ): Promise<Array<object>> {
  //   try {
  //     const summoners: Array<object> = JSON.parse(JSON.stringify(dbSummoners));
  //     summoners.forEach((summoner: object) => {
  //       delete summoner['userId'];
  //       delete summoner['createdAt'];
  //       delete summoner['updatedAt'];
  //     });

  //     const res = [];
  //     summoners.map(async (summoner: object) => {
  //       const data: any = {
  //         ...summoner,
  //       };
  //       const result = await this.updateSummoner(summoner['id'], data);
  //       res.push(result);
  //     });
  //     return res;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }
  // async updateSummoner(id: string, summoner: object): Promise<Summoner> {
  //   try {
  //     const data: any = {
  //       ...summoner,
  //     };
  //     delete data['id'];
  //     const result = await this.prisma.summoner.upsert({
  //       where: {
  //         id,
  //       },
  //       update: {
  //         ...data,
  //       },
  //       create: {
  //         ...data,
  //       },
  //     });
  //     return result;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }
}
