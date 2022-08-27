import { Module } from '@nestjs/common';

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
