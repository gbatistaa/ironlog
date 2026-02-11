import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkoutExerciseService } from './workout-exercise.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';

@Controller('workout-exercise')
export class WorkoutExerciseController {
  constructor(private readonly workoutExerciseService: WorkoutExerciseService) {}

  @Post()
  create(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    return this.workoutExerciseService.create(createWorkoutExerciseDto);
  }

  @Get()
  findAll() {
    return this.workoutExerciseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutExerciseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutExerciseDto: UpdateWorkoutExerciseDto) {
    return this.workoutExerciseService.update(+id, updateWorkoutExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutExerciseService.remove(+id);
  }
}
