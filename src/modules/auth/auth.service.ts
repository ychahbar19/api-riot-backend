import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  async login(body: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) throw new HttpException('User not found', 404);
      const isValid = await argon.verify(user.password, body.password);
      if (!isValid) throw new HttpException('Invalid password', 401);
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async signup(body: AuthDto) {
    try {
      // generate the password
      const hash: string = await argon.hash(body.password);
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          password: hash,
        },
        // select: {
        //   id: true,
        //   email: true,
        //   username: true,
        //   createdAt: true,
        // },
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new HttpException('User already exists', 402);
      throw new HttpException('Forbidden', 500);
    }
  }
}
