import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseSchema, Exercise } from './schemas/exercise.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema}
    ])
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
