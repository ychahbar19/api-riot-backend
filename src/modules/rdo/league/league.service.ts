import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';

import { getServerAndRegion } from 'src/utils';

import { LeagueEntryResponse } from 'src/interfaces/league/league.interface';

@Injectable()
export class LeagueRdoService {
  private readonly headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  };
  constructor(private readonly httpService: HttpService) {}

  async getLeagueEntryByIdAndPlatform(
    id: string,
    platform: string,
  ): Promise<LeagueEntryResponse> {
    try {
      const { server, region } = getServerAndRegion({ platform });

      const summoner = await this.httpService.axiosRef.get(
        `https://${server}${process.env.LOL_API_URL}${process.env.GET_SUMMONER_BY_ID}${id}`,
        { headers: this.headers },
      );
      return {
        server,
        region,
        leagueEntries: summoner.data,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
