import { Controller, Get, HttpException } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/hello')
  getHello(): string {
    try {
      return this.appService.getHello();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
