import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpException,
  Post,
  HttpStatus,
  Body,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { Public } from 'src/decorators';

import { LeagueRdoService } from './league.service';
import { LeagueEntryResponse } from 'src/interfaces/league/league.interface';

const endpoint = 'league';

@Controller()
export class LeagueRdoController {
  constructor(
    private readonly httpService: HttpService,
    private readonly leagueRdoService: LeagueRdoService,
  ) {}

  @Public()
  @Get(`${endpoint}/byId/:id/:platform`)
  @HttpCode(200)
  async getSummonerByIdAndPlatform(
    @Param('id') summonerId: string,
    @Param('platform') platform: string,
  ): Promise<LeagueEntryResponse> {
    try {
      const summoner =
        await this.leagueRdoService.getLeagueEntryByIdAndPlatform(
          summonerId,
          platform,
        );
      return summoner;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
