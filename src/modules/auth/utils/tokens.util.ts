import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as argon from 'argon2';

const updateRtHash = async (
  data: { rt: string; userId: string },
  prisma: PrismaService,
): Promise<any> => {
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
): Promise<any> => {
  try {
    const [at, rt] = await Promise.all([
      await jwtService.signAsync(
        {
          sub: data.userId,
          email: data.email,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      ),
      await jwtService.signAsync(
        {
          sub: data.userId,
          email: data.email,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    ]);
    return { accessToken: at, refreshToken: rt };
  } catch (error) {
    throw new Error(error.message);
  }
};
export { updateRtHash, getTokens };
