import {
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

import { SummonerService } from './summoner.service';

import { SummonerRequestDto } from './dto/index';
import { SummonerResponse } from 'src/interfaces/summoner/summoner.interface';

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
  ): Promise<SummonerResponse[]> {
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
  ): Promise<SummonerResponse> {
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
  @Get(`${endpoint}/byId/:id/:platform`)
  @HttpCode(200)
  async getSummonerByIdAndPlatform(
    @Param('id') summonerId: string,
    @Param('platform') platform: string,
  ): Promise<SummonerResponse> {
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
}
