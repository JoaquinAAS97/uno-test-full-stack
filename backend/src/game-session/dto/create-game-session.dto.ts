import {
  IsDateString,
  IsEnum,
  IsInt,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';
import { GameResult } from '../enums/game-results.enum';
import { Transform } from 'class-transformer';

export class CreateGameSessionDto {
  @IsUUID()
  idUser: string;

  @IsDateString()
  finishedAt: string;

  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(GameResult, { message: 'resultGame must be WIN, LOSE or SURRENDER' })
  resultGame: GameResult;

  @IsInt()
  @Min(0)
  hits: number;

  @IsInt()
  @Min(0)
  errors: number;

  @IsUUID()
  codeDeck: string;
}
