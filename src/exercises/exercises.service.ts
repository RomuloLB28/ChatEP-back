import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name)
    private readonly exerciseModel: Model<ExerciseDocument>,
  ) {}

  async create(CreateExerciseDto: CreateExerciseDto) {
    const created = new this.exerciseModel(CreateExerciseDto);
    return created.save();
  }

  async findAll() {
    return this.exerciseModel.find().exec();
  }

  async findOne(id: string) {
    const exercise = await this.exerciseModel.findById(id).exec();
    if (!exercise) throw new NotFoundException('Exercisio não encontrado');
    return exercise;
  }

  async findByType(type: string) {
    return this.exerciseModel.find({ type }).exec();
  }

  async update(id: string, data: Partial<CreateExerciseDto>) {
    const updated = await this.exerciseModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!updated) throw new NotFoundException('Exercise not found');

    return updated;
  }

  async remove(id: string) {
    const deleted = await this.exerciseModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Exercise not found');
    return deleted;
  }
}