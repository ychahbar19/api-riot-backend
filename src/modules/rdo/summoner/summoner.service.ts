import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  async getSummonersByName(name: string): Promise<SummonerResponse[]> {
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
  ): Promise<SummonerResponse> {
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
  ): Promise<SummonerResponse> {
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
        ...summoner.data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
