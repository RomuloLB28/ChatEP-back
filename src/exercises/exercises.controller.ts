import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common'

import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Controller('exercises')
export class ExercisesController{
  constructor(private readonly exercisesService: ExercisesService){}

  @Post()
  create(@Body() CreateExerciseDto: CreateExerciseDto){
    return this.exercisesService.create(CreateExerciseDto);
  }

  @Get()
  findAll(){
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string){
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() data: Partial<CreateExerciseDto>){
    return this.exercisesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.exercisesService.remove(id);
  }

}