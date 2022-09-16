import { Module, CacheModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

//import redisStore from 'cache-manager-redis-store';
import * as redisStore from 'cache-manager-redis-store';

import { PrismaModule } from './prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SummonerModule } from './modules/summoner/summoner.module';

// PROVIDERS
import { ConfigService } from './config/config.service';
import { AtGuard } from './guards/index';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    SummonerModule,
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
