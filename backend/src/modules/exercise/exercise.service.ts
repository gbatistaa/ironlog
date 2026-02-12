import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { handleDatabaseErrors } from '../common/errors/treatErrors';
import { ExerciseDto } from './dto/exercise.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly repository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<ExerciseDto> {
    try {
      const exerciseExists = await this.repository.findOneBy({
        name: createExerciseDto.name,
      });

      if (exerciseExists) {
        throw new BadRequestException('Exercise already exists');
      }

      const exercise = this.repository.create(createExerciseDto);
      const dbExercise = await this.repository.save(exercise);

      return plainToInstance(ExerciseDto, dbExercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on exercise creation', error);

      throw new InternalServerErrorException(
        'Unexpected error on exercise creation',
      );
    }
  }

  async findAll(): Promise<ExerciseDto[]> {
    try {
      const exercises = await this.repository.find();

      if (!exercises || exercises.length === 0) {
        throw new NotFoundException('No exercises found');
      }

      return plainToInstance(ExerciseDto, exercises);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on exercise find all', error);

      throw new InternalServerErrorException(
        'Unexpected error on exercise find all',
      );
    }
  }

  async findOne(id: string): Promise<ExerciseDto> {
    try {
      const exercise = await this.repository.findOneBy({ id });

      if (!exercise) {
        throw new NotFoundException(`Exercise ${id} not found`);
      }

      return plainToInstance(ExerciseDto, exercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on exercise find one', error);

      throw new InternalServerErrorException(
        'Unexpected error on exercise find one',
      );
    }
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    try {
      const dbExercise = await this.repository.preload({
        id,
        ...updateExerciseDto,
      });

      if (!dbExercise) {
        throw new NotFoundException(`Exercise ${id} not found`);
      }

      const exercise = await this.repository.save(dbExercise);

      return plainToInstance(ExerciseDto, exercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on exercise update', error);

      throw new InternalServerErrorException(
        'Unexpected error on exercise update',
      );
    }
  }

  remove(id: string) {
    try {
      const exercise = this.repository.delete(id);
      return plainToInstance(ExerciseDto, exercise);
    } catch (error: unknown) {
      handleDatabaseErrors(error);

      console.log('Fatal error on exercise remove', error);

      throw new InternalServerErrorException(
        'Unexpected error on exercise remove',
      );
    }
  }
}
