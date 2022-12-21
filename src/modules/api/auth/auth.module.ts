import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

// CONTROLLERS
import { AuthController } from './auth.controller';

// PROVIDERS
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
