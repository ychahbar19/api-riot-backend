import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/index';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('auth/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
