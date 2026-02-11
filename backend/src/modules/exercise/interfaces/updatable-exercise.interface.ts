import { CretableExerciseInterface } from './cretable-exercise.interface';

export interface UpdatableExerciseInterface extends Partial<CretableExerciseInterface> {
  id: string;
}
