import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutExercise } from './entities/workout-exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutExercise])],
  controllers: [WorkoutExerciseController],
  providers: [WorkoutExerciseService],
})
export class WorkoutExerciseModule {}
