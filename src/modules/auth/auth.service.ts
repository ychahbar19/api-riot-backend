import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/index';

import * as argon from 'argon2';
// import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types/index';

import { updateRtHash, getTokens } from './utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: await argon.hash(dto.password),
        },
      });

      const tokens = await getTokens(
        {
          userId: newUser.id,
          email: newUser.email,
        },
        this.jwtService,
      );

      await updateRtHash(
        {
          rt: tokens.refreshToken,
          userId: newUser.id,
        },
        this.prisma,
      );
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async loginLocal(dto: AuthDto): Promise<Tokens> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) throw new HttpException('User not found', 404);

      const isValidPassword = await argon.verify(user.password, dto.password);
      if (!isValidPassword) throw new HttpException('Invalid password', 401);

      const tokens = await getTokens(
        {
          userId: user.id,
          email: user.email,
        },
        this.jwtService,
      );
      await updateRtHash(
        {
          rt: tokens.refreshToken,
          userId: user.id,
        },
        this.prisma,
      );
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async logout(userId: string) {
    try {
      await this.prisma.user.updateMany({
        where: {
          id: userId,
          refreshToken: {
            not: null,
          },
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async refresh(userId: string, refreshToken: string): Promise<Tokens> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) throw new HttpException('User not found', 404);

      const rtMatches = await argon.verify(user.refreshToken, refreshToken);
      if (!rtMatches) throw new HttpException('Invalid refresh token', 401);
      const tokens = await getTokens(
        {
          userId: user.id,
          email: user.email,
        },
        this.jwtService,
      );
      await updateRtHash(
        {
          rt: tokens.refreshToken,
          userId: user.id,
        },
        this.prisma,
      );
      return tokens;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
