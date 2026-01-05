import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  UserExercise,
  UserExerciseDocument,
} from './schemas/user-exercise.schema';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';

@Injectable()
export class UserExercisesService {
  constructor(
    @InjectModel(UserExercise.name)
    private readonly userExerciseModel: Model<UserExerciseDocument>,
  ) {}

  async createOrUpdate(userId: string, dto: CreateUserExerciseDto) {
    return this.userExerciseModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        exerciseId: new Types.ObjectId(dto.exerciseId),
      },
      {
        $set: {
          type: dto.type,
          level: dto.level,
          userAnswer: dto.userAnswer,
          isCorrect: dto.isCorrect,
          score: dto.score ?? 0,
        },
      },
      {
        upsert: true, // 🔥 cria se não existir
        new: true, // 🔥 retorna o documento atualizado
      },
    );
  }

  findByUser(userId: string) {
    return this.userExerciseModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .exec();
  }

  async findAll() {
    return this.userExerciseModel.find().exec();
  }
}
