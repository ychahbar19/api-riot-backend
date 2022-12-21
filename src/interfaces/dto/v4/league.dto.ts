interface LeagueEntryDTO {
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries?: MiniSeriesDTO;
}

interface MiniSeriesDTO {
  wins: number;
  losses: number;
  target: number;
  progress: string;
}

export { LeagueEntryDTO, MiniSeriesDTO };
