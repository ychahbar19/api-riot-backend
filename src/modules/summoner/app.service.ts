import { Injectable, Param, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class SummonerService {
  getSummoner(@Param('id', ParseIntPipe) id: string): string {
    return `Hello World! ${id}`;
  }
  postSummoner(@Param('id', ParseIntPipe) id: string): string {
    return `Hello World! ${id}`;
  }
}
