import { CreatableWorkoutExerciseInterface } from './creatable-workout-exercise.interface';

export interface UpdatableWorkoutExerciseInterface extends Partial<CreatableWorkoutExerciseInterface> {
  id: string;
}
