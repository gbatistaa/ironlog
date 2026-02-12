import { Column, Entity, OneToMany } from 'typeorm';
import { WorkoutInterface } from '../interfaces/workout.interface';
import { CommonEntity } from 'src/modules/common/entities/common.entity';
import { WorkoutExercise } from 'src/modules/workout-exercise/entities/workout-exercise.entity';

@Entity()
export class Workout extends CommonEntity implements WorkoutInterface {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
  )
  exercises: WorkoutExercise[];
}
