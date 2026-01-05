import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserExercise,
  UserExerciseSchema,
} from './schemas/user-exercise.schema';
import { UserExercisesController } from './user-exercises.controller';
import { UserExercisesService } from './user-exercises.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserExercise.name,
        schema: UserExerciseSchema,
      },
    ]),
  ],
  controllers: [UserExercisesController],
  providers: [UserExercisesService],
})
export class UserExercisesModule {}
