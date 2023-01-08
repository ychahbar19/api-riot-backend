import {
  Get,
  Param,
  Controller,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { Public } from 'src/decorators';
import { getServerAndRegion } from 'src/utils';

import { SummonerRdoService } from './summoner.service';

import { SummonerApiResponse } from 'src/interfaces/summoner/summoner.interface';

const endpoint = 'summoner';

@Controller()
export class SummonerRdoController {
  constructor(private readonly summonerService: SummonerRdoService) {}

  // return all the possible summoners
  @Public()
  @Get(`${endpoint}s/:name`)
  @HttpCode(200)
  async getSummonersByName(
    @Param('name') summonerName: string,
  ): Promise<SummonerApiResponse[]> {
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
  @Get(`${endpoint}/byName/:name/:platform`)
  @HttpCode(200)
  async getSummonerByName(
    @Param('name') summonerName: string,
    @Param('platform') platform: string,
  ): Promise<SummonerApiResponse> {
    try {
      const { server, region } = getServerAndRegion({ platform });

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
}
