import { Prisma } from '@prisma/client';

// interface User {
//   id: string;
//   email: string;
//   username: string;
//   refreshToken: string;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface UserResponse {
//   id: string;
//   email: string;
//   username: string;
//   refreshToken?: string;
//   password?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
//   summoners?: SummonerResponse[];
// }

const publicUser = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    username: true,
    createdAt: true,
    updatedAt: true,
    summoners: true,
  },
});

type PublicUser = Prisma.UserGetPayload<typeof publicUser>;

export { PublicUser };
