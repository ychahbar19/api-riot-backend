import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// import { GameController } from './modules/game/app.controller';
// import { GameService } from './modules/game/app.service';

// import { SummonerController } from './modules/summoner/app.controller';
// import { SummonerService } from './modules/summoner/app.service';

// import mongodbConnect from './config/database.config';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

// PROVIDERS
import { ConfigService } from './config/config.service';
@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
