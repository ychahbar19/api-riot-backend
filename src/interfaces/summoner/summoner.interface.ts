import { Prisma } from '@prisma/client';

// interface SummonerDB {
//   server: true;
//   region: true;
//   summonerId: true;
//   accountId: true;
//   name: true;
//   summonerLevel: true;
//   profileIconId: true;
//   revisionDate: true;
//   puuid: true;
//   userId: true;
//   createdAt: Date;
//   updatedAt: Date;
// }

interface SummonerApiResponse {
  server: string;
  region: string;
  summonerId: string;
  accountId: string;
  name: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
  puuid: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

const createSummoner = Prisma.validator<Prisma.SummonerArgs>()({
  select: {
    server: true,
    region: true,
    summonerId: true,
    accountId: true,
    name: true,
    summonerLevel: true,
    profileIconId: true,
    revisionDate: true,
    puuid: true,
  },
});

type CreateSummoner = Prisma.SummonerGetPayload<typeof createSummoner>;

export { CreateSummoner, SummonerApiResponse };
