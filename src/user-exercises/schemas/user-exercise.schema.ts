import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserExerciseDocument = UserExercise & Document;

@Schema({ timestamps: true, collection: 'user-exercises' })
export class UserExercise {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Exercise', required: true })
  exerciseId: Types.ObjectId;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  level: string; // 🔥 NOVO CAMPO

  @Prop({ required: true })
  userAnswer: string;

  @Prop({ required: true })
  isCorrect: boolean;

  @Prop({ default: 0 })
  score: number;
}

export const UserExerciseSchema = SchemaFactory.createForClass(UserExercise);
