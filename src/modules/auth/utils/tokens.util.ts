import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';
import { JwtPayload, Tokens } from '../types';

const updateRtHash = async (
  data: { rt: string; userId: string },
  prisma: PrismaService,
) => {
  try {
    const hashedRt = await argon.hash(data.rt);
    await prisma.user.update({
      where: { id: data.userId },
      data: { refreshToken: hashedRt },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTokens = async (
  data: { userId: string; email: string },
  jwtService: JwtService,
): Promise<Tokens> => {
  try {
    const jwtPayload: JwtPayload = {
      sub: data.userId,
      email: data.email,
    };
    const [at, rt] = await Promise.all([
      await jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRES_IN),
      }),
      await jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRES_IN),
      }),
    ]);
    return { accessToken: at, refreshToken: rt };
  } catch (error) {
    throw new Error(error.message);
  }
};
export { updateRtHash, getTokens };
