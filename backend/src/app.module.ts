import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { WorkoutModule } from './modules/workout/workout.module';
import { ExerciseModule } from './modules/exercise/exercise.module';

@Module({
  imports: [ExerciseModule, WorkoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
