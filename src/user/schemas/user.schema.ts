import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: 'admin', description: 'The name of the user' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'password', description: 'The password of the user' })
  @Prop({ required: true })
  password: string;

  @ApiProperty({ example: 'user', description: 'The role of the user' })
  @Prop({ required: true })
  role: string;

  @ApiProperty({ example: 'active', description: 'The status of the user' })
  @Prop({ default: 'active' })
  status: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the user creation',
  })
  @Prop({ default: new Date() })
  date_create: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the user edit',
  })
  @Prop({ default: new Date() })
  date_edit: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
