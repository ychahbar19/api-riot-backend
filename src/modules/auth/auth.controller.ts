import { Body, Controller, HttpException, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { AuthDto } from './dto/index';
import { Tokens } from './types';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local/signup')
  async signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    try {
      const signedUpUser = await this.authService.signupLocal(dto);
      return signedUpUser;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // @Post('/local/signin')
  // async loginLocal(@Body() dto: AuthDto) {
  //   try {
  //     const loggedInUser = await this.authService.loginLocal(dto);
  //     return loggedInUser;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Post('/logout')
  // async logout() {
  //   try {
  //     await this.authService.logout();
  //     return true;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Post('/refresh')
  // async refresh() {
  //   try {
  //     await this.authService.refresh();
  //     return true;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Post('auth/login')
  // async login(@Body() dto: AuthDto) {
  //   try {
  //     const loggedInUser = await this.authService.login(dto);
  //     return loggedInUser;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }

  // @Post('auth/signup')
  // async signup(@Body() dto: AuthDto) {
  //   try {
  //     const signedUpUser = await this.authService.signup(dto);
  //     return signedUpUser;
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status);
  //   }
  // }
}
