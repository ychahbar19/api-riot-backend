import { Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from './user.controller';

// PROVIDERS
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
