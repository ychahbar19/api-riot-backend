import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  getAllRoutingPlatform,
  getRegionFromRoutingPlatform,
  getServerFromRoutingPlatform,
} from 'src/utils';

import { SummonerDto } from './dto';

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
}
