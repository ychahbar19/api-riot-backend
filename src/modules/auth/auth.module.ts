import { Module } from '@nestjs/common';

// CONTROLLERS
import { AuthController } from './auth.controller';

// PROVIDERS
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
