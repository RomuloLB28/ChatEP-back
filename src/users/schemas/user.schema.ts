import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: String, required: false, default: null })
  password: string | null;

  @Prop({ type: String, required: false, default: null })
  photo: string | null;

  @Prop({ type: String, required: false, default: 'credentials' })
  provider: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
