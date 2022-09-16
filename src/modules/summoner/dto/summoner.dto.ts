import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SummonerDto {
  @IsString()
  @IsNotEmpty()
  readonly region: string;
  @IsString()
  @IsNotEmpty()
  readonly server: string;
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly accountId: string;
  @IsString()
  @IsNotEmpty()
  readonly puuid: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsNumber()
  @IsNotEmpty()
  readonly profileIconId: number;
  @IsNumber()
  @IsNotEmpty()
  readonly revisionDate: number;
  @IsNumber()
  @IsNotEmpty()
  readonly summonerLevel: number;
}
