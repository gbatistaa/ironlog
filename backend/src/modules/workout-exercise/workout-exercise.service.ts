import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { Repository } from 'typeorm';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { handleDatabaseErrors } from '../common/errors/treatErrors';

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly repo: Repository<WorkoutExercise>) {}

  async create(createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    try {
      const workoutExerciseExists = await this.repo.findOneBy({
        workoutId: createWorkoutExerciseDto.workoutId,
        exerciseId: createWorkoutExerciseDto.exerciseId,
      });

      if (workoutExerciseExists) {
        throw new BadRequestException('Workout exercise already exists');
      }

      const workoutExercise = this.repo.create(createWorkoutExerciseDto);
      return this.repo.save(workoutExercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout exercise creation', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout exercise creation',
      );
    }
  }

  findAll() {
    try {
      const workoutExercises = this.repo.find();
      return workoutExercises;
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout exercise find all', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout exercise find all',
      );
    }
  }

  async findOne(id: string) {
    try {
      const workoutExercise = await this.repo.findOneBy({ id });
      return workoutExercise;
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout exercise find one', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout exercise find one',
      );
    }
  }

  async update(id: string, updateWorkoutExerciseDto: UpdateWorkoutExerciseDto) {
    try {
      const workoutExercise = await this.repo.findOneBy({ id });

      if (!workoutExercise) {
        throw new NotFoundException(`Workout exercise ${id} not found`);
      }

      return this.repo.save({
        ...workoutExercise,
        ...updateWorkoutExerciseDto,
      });
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout exercise update', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout exercise update',
      );
    }
  }

  async remove(id: string) {
    try {
      const workoutExercise = await this.repo.findOneBy({ id });

      if (!workoutExercise) {
        throw new NotFoundException(`Workout exercise ${id} not found`);
      }

      return this.repo.remove(workoutExercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout exercise remove', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout exercise remove',
      );
    }
  }
}
