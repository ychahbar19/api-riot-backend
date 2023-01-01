import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeagueRdoController } from './league.controller';
import { LeagueRdoService } from './league.service';

@Module({
  imports: [HttpModule],
  controllers: [LeagueRdoController],
  providers: [LeagueRdoService],
  exports: [LeagueRdoService],
})
export class SummonerRdoModule {}
