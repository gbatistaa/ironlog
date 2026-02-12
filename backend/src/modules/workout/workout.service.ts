import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  create(createWorkoutDto: CreateWorkoutDto) {
    try {
      return this.workoutRepository.save(createWorkoutDto);
    } catch (error: unknown) {
      console.log(error);
      handleDatabaseErrors(error);
      throw new InternalServerErrorException(
        'Unexpected error on workout creation',
      );
    }
  }

  findAll() {
    return this.workoutRepository.find();
  }

  findOne(id: string) {
    return this.workoutRepository.findOneBy({ id });
  }

  update(id: string, updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutRepository.update(id, updateWorkoutDto);
  }

  remove(id: string) {
    return this.workoutRepository.delete(id);
  }
}
