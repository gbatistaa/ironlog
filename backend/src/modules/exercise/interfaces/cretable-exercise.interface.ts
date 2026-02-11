import { MuscleGroup } from 'src/modules/common/enums/muscle-group.enum';

export interface CretableExerciseInterface {
  name: string;
  description?: string;
  muscleGroup: MuscleGroup;
  videoUrl?: string;
}
