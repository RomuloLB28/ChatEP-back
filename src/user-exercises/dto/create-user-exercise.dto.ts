import {
  IsBoolean,
  IsMongoId,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class CreateUserExerciseDto {
  @IsMongoId()
  exerciseId: string;

  @IsString()
  type: string;

  @IsString()
  level: string;

  @IsString()
  userAnswer: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsOptional()
  @IsNumber()
  score?: number;
}
