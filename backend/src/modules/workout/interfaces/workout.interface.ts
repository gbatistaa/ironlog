import { CommonEntityInterface } from 'src/modules/common/interfaces/common.interface';

export interface WorkoutInterface extends CommonEntityInterface {
  name: string;
  description?: string;
}
