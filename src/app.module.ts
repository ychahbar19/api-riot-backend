import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import * as redisStore from 'cache-manager-redis-store';

import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

import { AuthModule } from './modules/api/auth/auth.module';
import { UserModule } from './modules//api/user/user.module';
import { SummonerModule } from './modules/api/summoner/summoner.module';

import { SummonerRdoModule } from './modules/rdo/summoner/summoner.module';

// PROVIDERS
import { ConfigService } from './config/config.service';
import { AtGuard } from './guards/index';
import { HttpModule } from '@nestjs/axios';

const dtoModules = [SummonerRdoModule];
const apiModules = [AuthModule, UserModule, SummonerModule];
@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    RedisModule,
    PrismaModule,
    ...dtoModules,
    ...apiModules,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    ConfigService,
  ],
})
export class AppModule {}
