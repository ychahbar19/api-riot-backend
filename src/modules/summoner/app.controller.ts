import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SummonerService } from './app.service';

@Controller()
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Get('summoner/:id')
  getHello(@Param('id', ParseIntPipe) id: string): string {
    return this.summonerService.getSummoner(id);
  }

  @Post('summoner/:id')
  postGame(@Param('id', ParseIntPipe) id: string): string {
    return this.summonerService.postSummoner(id);
  }
}
