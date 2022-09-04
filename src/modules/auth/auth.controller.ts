import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/index';
import { Tokens } from './types/index';
import { RtGuard } from 'src/guards/index';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/decorators/index';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    try {
      const signedUpUser = await this.authService.signupLocal(dto);
      return signedUpUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async loginLocal(@Body() dto: AuthDto): Promise<Tokens> {
    try {
      const tokens = await this.authService.loginLocal(dto);
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string): Promise<any> {
    try {
      return await this.authService.logout(userId);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    try {
      const tokens = await this.authService.refresh(userId, refreshToken);
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
