import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  description?: string;
}
