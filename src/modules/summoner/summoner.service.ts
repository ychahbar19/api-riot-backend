import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Summoner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  getAllRoutingPlatform,
  getRegionFromRoutingPlatform,
  getServerFromRoutingPlatform,
} from 'src/utils';

import { SummonerDto } from './dto';

// import { _isEqual } from 'lodash/isEqual';
// import { _omit } from 'lodash/omit';
// import lodash
import _ from 'lodash';
@Injectable()
export class SummonerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}
  async getSummonersByName(name: string): Promise<Array<object>> {
    try {
      const riotRoutingPlatforms: string[] = getAllRoutingPlatform();
      const headers = {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      };

      const summoners = [];
      await Promise.all(
        riotRoutingPlatforms.map(async (platform) => {
          try {
            const region: string = getRegionFromRoutingPlatform(platform);
            const server: string = getServerFromRoutingPlatform(platform);
            const summoner = await this.httpService.axiosRef.get(
              `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
              { headers },
            );
            summoners.push({
              server,
              region,
              ...summoner.data,
            });
          } catch (error) {
            if (error.response.status === 404) return;
            else throw new HttpException(error.message, error.status);
          }
        }),
      );
      return summoners;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getSummonerByName(
    name: string,
    server: string,
    region: string,
  ): Promise<object> {
    try {
      const headers = {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      };

      const summoner = await this.httpService.axiosRef.get(
        `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
        { headers },
      );

      return {
        server,
        region,
        ...summoner.data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getSummonerByIdAndPlatform(
    id: string,
    server: string,
    region: string,
  ): Promise<object> {
    try {
      const headers = {
        'X-Riot-Token': process.env.RIOT_API_KEY,
      };

      const summoner = await this.httpService.axiosRef.get(
        `https://${server}${process.env.LOL_API_URL}${process.env.GET_SUMMONER_BY_ID}${id}`,
        { headers },
      );
      return {
        server,
        region,
        data: summoner.data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createSummoner(userId: string, summoner: SummonerDto): Promise<object> {
    try {
      // TODO: fix prisma type data error
      const data: any = {
        userId,
        ...summoner,
      };
      const newSummoner: any = await this.prisma.summoner.create({
        data,
      });
      return newSummoner;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Summoner already exists',
            HttpStatus.CONFLICT,
          );
        }
      }
      throw new HttpException(error.message, error.status);
    }
  }

  async findSummonerBySummonerId(
    userId: string,
    summonerId: string,
  ): Promise<object> {
    try {
      const summoner = await this.prisma.summoner.findUnique({
        where: {
          id: summonerId,
        },
        // include: {
        //   user: true,
        // },
      });
      if (summoner.userId !== userId) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
      return summoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findManySummoners(userId: string): Promise<Array<object>> {
    try {
      const summoners = await this.prisma.summoner.findMany({
        where: {
          userId,
        },
      });
      return summoners;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async getSummonersBySummonerName(
    summoners: Array<object>,
  ): Promise<Array<object>> {
    try {
      const summonersData = [];
      await Promise.all(
        summoners.map(async (summoner: object) => {
          try {
            const summonerData = await this.getSummonerByName(
              summoner['name'],
              summoner['server'],
              summoner['region'],
            );
            summonersData.push({
              server: summoner['server'],
              region: summoner['region'],
              ...summonerData,
            });
          } catch (error) {
            throw new HttpException(error.message, error.status);
          }
        }),
      );
      return summonersData;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async compareAndUpdateSummoners(
    dbSummoners: Array<object>,
    fetchedSummoners: Array<object>,
  ): Promise<Array<object>> {
    try {
      const summoners: Array<object> = JSON.parse(JSON.stringify(dbSummoners));
      summoners.forEach((summoner: object) => {
        delete summoner['userId'];
        delete summoner['createdAt'];
        delete summoner['updatedAt'];
      });

      const res = [];
      summoners.map(async (summoner: object) => {
        const data: any = {
          ...summoner,
        };
        const result = await this.updateSummoner(summoner['id'], data);
        res.push(result);
      });
      return res;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async updateSummoner(id: string, summoner: object): Promise<Summoner> {
    try {
      const data: any = {
        ...summoner,
      };
      delete data['id'];
      const result = await this.prisma.summoner.upsert({
        where: {
          id,
        },
        update: {
          ...data,
        },
        create: {
          ...data,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
