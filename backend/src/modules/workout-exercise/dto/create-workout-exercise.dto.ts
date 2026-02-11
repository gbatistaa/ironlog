import { IsInt, IsNumber, IsUUID, Min } from 'class-validator';
import { CreatableWorkoutExerciseInterface } from '../interfaces/creatable-workout-exercise.interface';

export class CreateWorkoutExerciseDto implements CreatableWorkoutExerciseInterface {
  @IsUUID()
  workoutId: string;

  @IsUUID()
  exerciseId: string;

  @IsInt()
  @Min(1)
  sets: number;

  @IsInt()
  @Min(1)
  reps: number;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsInt()
  @Min(0)
  restTime: number;
}
