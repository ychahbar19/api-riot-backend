import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { GameController } from './modules/game/app.controller';
import { GameService } from './modules/game/app.service';

import { SummonerController } from './modules/summoner/app.controller';
import { SummonerService } from './modules/summoner/app.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, GameController, SummonerController],
  providers: [AppService, GameService, SummonerService],
})
export class AppModule {}
