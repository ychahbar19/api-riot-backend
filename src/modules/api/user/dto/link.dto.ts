import { IsNotEmpty, IsString } from 'class-validator';

export class LinkDto {
  @IsString()
  @IsNotEmpty()
  readonly platform: string;
  @IsString()
  @IsNotEmpty()
  readonly summonerPuuid: string;
}
