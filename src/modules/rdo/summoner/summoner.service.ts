import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

import { getAllRoutingPlatform, getServerAndRegion } from 'src/utils';

import { SummonerApiResponse } from 'src/interfaces/summoner/summoner.interface';

@Injectable()
export class SummonerRdoService {
  private readonly headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  };
  constructor(private readonly httpService: HttpService) {}

  async getSummonersByName(name: string): Promise<SummonerApiResponse[]> {
    try {
      const riotRoutingPlatforms: string[] = getAllRoutingPlatform();

      const summoners = [];
      await Promise.all(
        riotRoutingPlatforms.map(async (platform) => {
          try {
            const { server, region } = getServerAndRegion({ platform });

            const summoner = await this.httpService.get(
              `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
              { headers: this.headers },
            );
            summoners.push({
              server,
              region,
              ...summoner,
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
  ): Promise<SummonerApiResponse> {
    try {
      const summoner = await this.httpService.axiosRef.get(
        `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`,
        { headers: this.headers },
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

  async getSummonerByPuuidAndPlatform(
    puuid: string,
    platform: string,
  ): Promise<SummonerApiResponse> {
    try {
      const { server, region } = getServerAndRegion({ platform });

      const summoner = await this.httpService.axiosRef.get(
        `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        { headers: this.headers },
      );
      delete Object.assign(summoner.data, {
        ['summonerId']: summoner.data['id'],
      })['id'];

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
