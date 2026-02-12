import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { handleDatabaseErrors } from '../common/errors/treatErrors';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepository: Repository<Workout>,
  ) {}

  async create(createWorkoutDto: CreateWorkoutDto) {
    try {
      const workoutExists = await this.workoutRepository.findOneBy({
        name: createWorkoutDto.name,
      });

      if (workoutExists) {
        throw new BadRequestException('Workout name already exists');
      }

      const workout = this.workoutRepository.create(createWorkoutDto);
      return this.workoutRepository.save(workout);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout creation', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout creation',
      );
    }
  }

  async findAll() {
    try {
      const workouts = await this.workoutRepository.find();

      if (!workouts || workouts.length === 0) {
        throw new NotFoundException('Workouts not found');
      }

      return workouts;
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout find all', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout find all',
      );
    }
  }

  async findOne(id: string) {
    try {
      const workout = await this.workoutRepository.findOneBy({ id });

      if (!workout) {
        throw new NotFoundException(`Workout ${id} not found`);
      }

      return workout;
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout find one', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout find one',
      );
    }
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    try {
      return this.workoutRepository.update(id, updateWorkoutDto);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout update', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout update',
      );
    }
  }

  async remove(id: string) {
    try {
      const workout = await this.workoutRepository.findOneBy({ id });

      if (!workout) {
        throw new NotFoundException(`Workout ${id} not found`);
      }

      return this.workoutRepository.remove(workout);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on workout remove', error);

      throw new InternalServerErrorException(
        'Unexpected error on workout remove',
      );
    }
  }
}
