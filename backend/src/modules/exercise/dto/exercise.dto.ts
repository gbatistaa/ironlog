import { Expose } from 'class-transformer';

export class ExerciseDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  muscleGroup: string;

  @Expose()
  videoUrl: string;
}
