import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/decorators';
import { UserService } from './user.service';

// INTERFACES
import { UserResponse } from '../../../interfaces/user/user.interface';

const endpoint = 'user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO: add Prisma model types to promises
  @Get(`${endpoint}/me`)
  @HttpCode(200)
  async me(@GetCurrentUserId() userId: string): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  // TODO: add Prisma model types to promises
  @Get(`${endpoint}/:id`)
  @HttpCode(200)
  async getUserById(@Param('id') userId: string): Promise<UserResponse> {
    try {
      const user = await this.userService.getUserById(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
