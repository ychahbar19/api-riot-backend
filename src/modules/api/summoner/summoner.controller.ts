import {
  Body,
  Post,
  Get,
  Param,
  Controller,
  HttpCode,
  HttpException,
} from '@nestjs/common';

import { SummonerService } from './summoner.service';

@Controller()
export class SummonerController {
  private endpoint = 'summoner';
  constructor(private readonly summonerService: SummonerService) {}

  // @Post(`${endpoint}/create`)
  // @HttpCode(201)
  // async createSummoner(
  //   @GetCurrentUserId() userId: string,
  //   @Body() dto: SummonerRequestDto,
  // ): Promise<object> {
  //   try {
  //     const summoner: object = await this.summonerService.createSummoner(
  //       userId,
  //       dto,
  //     );
  //     return summoner;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // refactor update to single summmoner
  // @Get(`${endpoint}/update/:summonerId`)
  // @HttpCode(200)
  // async getSummonerUpdates(
  //   @GetCurrentUserId() userId: string,
  //   @Param('summonerId') summonerId: string,
  // ): Promise<object> {
  //   try {
  //     const dbSummoner: object =
  //       await this.summonerService.findSummonerBySummonerId(userId, summonerId);
  //     // TODO: create a batch service to update all summoners
  //     const fetchedSummoner: object =
  //       await this.summonerService.getSummonerByIdAndPlatform(
  //         summonerId,
  //         dbSummoner['server'],
  //         dbSummoner['region'],
  //       );
  //     // const updatedSummoners: Array<object> =
  //     //   await this.summonerService.compareAndUpdateSummoners(
  //     //     dbSummoners,
  //     //     fetchedSummoners,
  //     //   );
  //     return dbSummoner;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }
}
