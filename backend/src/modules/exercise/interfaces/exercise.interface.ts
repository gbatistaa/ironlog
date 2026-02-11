import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';
import { MuscleGroup } from 'src/modules/common/enums/muscle-group.enum';

export interface ExerciseInterface extends CommonEntityInterface {
  name: string;
  description?: string;
  muscleGroup: MuscleGroup;
  videoUrl?: string;
}
