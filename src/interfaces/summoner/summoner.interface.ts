interface SummonerDB {
  server: string;
  region: string;
  summonerId: string;
  accountId: string;
  summonerName: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
  createdAt: Date;
  updatedAt: Date;
}

interface SummonerResponse {
  server: string;
  region: string;
  summonerId: string;
  accountId: string;
  summonerName: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { SummonerDB, SummonerResponse };
