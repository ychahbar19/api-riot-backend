import { Summoner } from '../../entities/summoner/summoner.entity';

export class SummonerBuilder {
  private readonly summoner: Summoner;

  constructor() {
    this.summoner = new Summoner();
  }

  public static aSummoner() {
    return new SummonerBuilder();
  }

  public withName(summonerName: string): SummonerBuilder {
    this.summoner.name = summonerName;
    return this;
  }

  public withId(summonerId: string): SummonerBuilder {
    this.summoner.summonerId = summonerId;
    return this;
  }

  public withAccountId(accountId: string): SummonerBuilder {
    this.summoner.accountId = accountId;
    return this;
  }

  public withPuuid(puuid: string): SummonerBuilder {
    this.summoner.puuid = puuid;
    return this;
  }

  public withProfileIconId(profileIconId: number): SummonerBuilder {
    this.summoner.profileIconId = profileIconId;
    return this;
  }

  public withRevisionDate(revisionDate: number): SummonerBuilder {
    this.summoner.revisionDate = revisionDate;
    return this;
  }

  public withLevel(summonerLevel: number): SummonerBuilder {
    this.summoner.summonerLevel = summonerLevel;
    return this;
  }

  public withRegion(region: string): SummonerBuilder {
    this.summoner.region = region;
    return this;
  }

  public withServer(server: string): SummonerBuilder {
    this.summoner.server = server;
    return this;
  }

  public withUserId(userId: string): SummonerBuilder {
    this.summoner.userId = userId;
    return this;
  }

  public build(): Summoner {
    return this.summoner;
  }
}
