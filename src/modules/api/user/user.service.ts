import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicUser } from 'src/interfaces/user/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: string): Promise<PublicUser> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
          summoners: true,
        },
      });
      if (!user) throw new HttpException('User not found', 404);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async linkSummonerToUser(userId: string, summonerId: string): Promise<void> {
    try {
      const summonerDB = await this.prisma.summoner.findUnique({
        where: { summonerId },
      });
      if (!summonerDB) throw new HttpException('Summoner not found', 404);
      this.prisma.user.update({
        where: { id: userId },
        data: {
          summoners: {
            connect: { summonerId },
          },
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async unlinkSummonerFromUser(
    user: PublicUser,
    summonerId: string,
  ): Promise<void> {
    try {
      const summonerDB = await this.prisma.summoner.findUnique({
        where: { summonerId },
      });
      if (!summonerDB) throw new HttpException('Summoner not found', 404);
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          summoners: {
            disconnect: { summonerId },
          },
        },
      });
      await this.prisma.summoner.update({
        where: { summonerId },
        data: {
          userId: '',
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
