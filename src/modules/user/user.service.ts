import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string): Promise<object> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!user) throw new HttpException('User not found', 404);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
