interface LeagueEntryResponse {
  server: string;
  region: string;
  leagueEntries: LeagueEntry[];
}

interface LeagueEntry {
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
  inactive: boolean;
  freshBlood: boolean;
  miniSeries?: miniSeries;
}

interface miniSeries {
  wins: number;
  losses: number;
  target: number;
  progress: string;
}

export { LeagueEntryResponse };
