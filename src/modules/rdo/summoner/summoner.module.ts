import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SummonerRdoController } from './summoner.controller';
import { SummonerRdoService } from './summoner.service';

@Module({
  imports: [HttpModule],
  controllers: [SummonerRdoController],
  providers: [SummonerRdoService],
  exports: [SummonerRdoService],
})
export class SummonerRdoModule {}
