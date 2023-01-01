import { Injectable, Param, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class GameService {
  getGame(@Param('id', ParseIntPipe) id: string): string {
    return `Hello World! ${id}`;
  }
  postGame(@Param('id', ParseIntPipe) id: string): string {
    return `Hello World! ${id}`;
  }
}
