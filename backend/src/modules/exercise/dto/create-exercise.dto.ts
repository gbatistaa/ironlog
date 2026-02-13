import { MuscleGroup } from 'src/modules/common/enums/muscle-group.enum';
import { CretableExerciseInterface } from '../interfaces/cretable-exercise.interface';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateExerciseDto implements CretableExerciseInterface {
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  name: string;

  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @IsOptional()
  description?: string;

  @IsEnum(MuscleGroup)
  muscleGroup: MuscleGroup;

  @IsString()
  @IsOptional()
  videoUrl?: string;
}
