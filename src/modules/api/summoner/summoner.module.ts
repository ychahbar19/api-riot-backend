import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummonerController } from './summoner.controller';
import { SummonerService } from './summoner.service';

@Module({
  imports: [HttpModule],
  controllers: [SummonerController],
  providers: [SummonerService],
  exports: [SummonerService],
})
export class SummonerModule {}
