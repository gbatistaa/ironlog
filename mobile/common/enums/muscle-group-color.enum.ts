import { MuscleGroup } from "./muscle-group.enum";

export const MuscleGroupColor: Record<MuscleGroup, string> = {
  [MuscleGroup.CHEST]: "#ef4444",
  [MuscleGroup.BACK]: "#3b82f6",
  [MuscleGroup.LEGS]: "#8b5cf6",
  [MuscleGroup.SHOULDERS]: "#f97316",
  [MuscleGroup.ARMS]: "#14b8a6",
  [MuscleGroup.CORE]: "#eab308",
  [MuscleGroup.CALVES]: "#ec4899",
  [MuscleGroup.CARDIO]: "#22c55e",
  [MuscleGroup.OTHER]: "#6b7280",
};
