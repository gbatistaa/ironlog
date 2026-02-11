import { Column, Entity, ManyToOne, JoinColumn, ForeignKey } from 'typeorm';
import { CommonEntity } from 'src/modules/common/entities/common.entity';
import { WorkoutExerciseInterface } from '../interfaces/workout-exercise.interface';
import { Workout } from 'src/modules/workout/entities/workout.entity';
import { Exercise } from 'src/modules/exercise/entities/exercise.entity';

@Entity()
export class WorkoutExercise
  extends CommonEntity
  implements WorkoutExerciseInterface
{
  @ForeignKey(() => Workout)
  @Column({ type: 'uuid' })
  workoutId: string;

  @ForeignKey(() => Exercise)
  @Column({ type: 'uuid' })
  exerciseId: string;

  @Column({ type: 'int', default: 1, nullable: false })
  sets: number;

  @Column({ type: 'int', default: 10, nullable: false })
  reps: number;

  @Column({ type: 'float', default: 0, nullable: false })
  weight: number;

  @Column({ type: 'int', default: 30, nullable: false })
  restTime: number;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;

  @ManyToOne(() => Exercise)
  @JoinColumn({ name: 'exerciseId' })
  exercise: Exercise;
}
