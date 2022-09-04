import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

// PROVIDERS
import { ConfigService } from './config/config.service';
import { AtGuard } from './guards/index';

@Module({
  imports: [AuthModule, PrismaModule],
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
