
import {
    IsString,
    IsOptional,
    IsIn,
    IsArray,
    IsNumber,
    ValidateIf,
    ArrayMinSize,
} from 'class-validator';

export class CreateExerciseDto {
    @IsString()
    @IsIn(['reading','listening','speaking'])
    type: 'reading' | 'listening' | 'speaking';

    @IsString()
    level: string;

    //reading
    @ValidateIf(o => o.type === 'reading')
    @IsString()
    text?: string;

    @ValidateIf(o => o.type === 'reading')
    @IsArray()
    @ArrayMinSize(4)
    options?: string[];

    @ValidateIf(o => o.type === 'reading')
    @IsNumber()
    correctAnswer?: number;

    //listening
    @ValidateIf(o => o.type === 'listening')
    @IsString()
    audioUrl?: string;

    @ValidateIf(o => o.type === 'listening')
    @IsString()
    transcript?: string;

    //speaking
    @ValidateIf(o => o.type === 'speaking')
    @IsString()
    prompt?: string;
}
