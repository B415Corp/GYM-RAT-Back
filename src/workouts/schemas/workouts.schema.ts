import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type WorkoutDocument = Workout & Document;

@Schema()
export class Workout {
  @ApiProperty({ example: 'admin', description: 'The name of the user' })
  @Prop({ required: true, type: String, ref: 'User' })
  user_id: string;

  @ApiProperty({
    example: 'Workout name',
    description: 'The name of the workout',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Workout description',
    description: 'The description of the workout',
    required: false,
  })
  @Prop()
  description: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the workout',
  })
  @Prop({ required: true, type: Date })
  date: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date when the workout was created',
    default: new Date(),
  })
  @Prop({ default: new Date(), type: Date })
  date_create: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date when the workout was last edited',
    default: new Date(),
  })
  @Prop({ default: new Date(), type: Date })
  date_edit: Date;
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);
