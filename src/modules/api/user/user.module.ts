import { Module } from '@nestjs/common';

// CONTROLLERS
import { UserController } from './user.controller';

// PROVIDERS
import { UserService } from './user.service';

import { SummonerModule } from '../summoner/summoner.module';
import { SummonerRdoModule } from 'src/modules/rdo/summoner/summoner.module';

@Module({
  imports: [SummonerModule, SummonerRdoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
