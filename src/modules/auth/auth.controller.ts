import { Body, Controller, HttpException, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/index';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() dto: AuthDto) {
    try {
      const loggedInUser = await this.authService.login(dto);
      return loggedInUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('auth/signup')
  async signup(@Body() dto: AuthDto) {
    try {
      const signedUpUser = await this.authService.signup(dto);
      return signedUpUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
