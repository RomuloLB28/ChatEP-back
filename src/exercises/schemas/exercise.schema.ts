import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Exercise{
    @Prop({ required: true })
    type: 'reading' | 'listening' | 'speaking' | 'writing';

    @Prop({ require: true})
    level: string;

    @Prop()
    text?: string;

    @Prop({ type: [String],default: []})
    options?: string[];

    @Prop()
    correctAnswer?: number;

    @Prop()
    audioUrl?: string;

    @Prop()
    transcript?: string;

    @Prop()
    prompt?: string;

    @Prop()
    task?: string

    @Prop({ type: [String],default: []})
    translations?: string[]
}

export type ExerciseDocument = Exercise & Document;
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);