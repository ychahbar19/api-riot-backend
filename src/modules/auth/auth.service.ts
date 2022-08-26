import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  login(body: AuthDto) {
    console.log(body);
    return 'user logged in';
  }

  async signup(body: AuthDto) {
    // generate the password
    const hash: string = await argon.hash(body.password);
    // save the new user in the db
    const user = await this.prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hash,
      },
    });
    // return the new user
    console.log(user);
    return 'user signed up';
  }
}
