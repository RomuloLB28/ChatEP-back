import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional() // permite login social
  @MinLength(6)
  password?: string | null;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  provider?: string;
}
