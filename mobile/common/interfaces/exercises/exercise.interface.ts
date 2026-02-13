import { MuscleGroup } from "@/common/enums/muscle-group.enum";

export interface ExerciseType {
  id: string;
  name: string;
  description: string;
  muscleGroup: MuscleGroup;
  videoUrl: string;
  createdAt: Date;
}
