import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  login() {
    return 'user logged in';
  }

  signup(body) {
    console.log(body);

    return 'user signed up';
  }
}
