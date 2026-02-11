import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';

export interface WorkoutExerciseInterface extends CommonEntityInterface {
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  restTime: number;
}
