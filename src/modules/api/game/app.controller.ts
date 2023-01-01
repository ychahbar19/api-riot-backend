import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GameService } from './app.service';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('game/:id')
  getGame(@Param('id', ParseIntPipe) id: string) {
    return this.gameService.getGame(id);
  }

  @Post('game/:id')
  postGame(@Param('id', ParseIntPipe) id: string): string {
    return this.gameService.postGame(id);
  }
}
