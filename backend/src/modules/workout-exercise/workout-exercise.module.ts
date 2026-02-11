import { Module } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { WorkoutExerciseController } from './workout-exercise.controller';

@Module({
  controllers: [WorkoutExerciseController],
  providers: [WorkoutExerciseService],
})
export class WorkoutExerciseModule {}
