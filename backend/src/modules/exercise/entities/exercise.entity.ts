import { CommonEntity } from 'src/modules/common/entities/common.entity';
import { MuscleGroup } from 'src/modules/common/enums/muscle-group.enum';
import { WorkoutExercise } from 'src/modules/workout-exercise/entities/workout-exercise.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Exercise extends CommonEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'enum', enum: MuscleGroup })
  muscleGroup: MuscleGroup;

  @Column({ type: 'varchar', length: 255, nullable: true })
  videoUrl: string;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise,
  )
  workoutExercises: WorkoutExercise[];
}
