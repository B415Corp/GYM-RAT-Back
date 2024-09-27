import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workout, WorkoutDocument } from './schemas/workouts.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

  async create(createWorkoutDto: any): Promise<Workout> {
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutModel.find().exec();
  }

  async findOne(id: string): Promise<Workout> {
    return this.workoutModel.findById(id).exec();
  }

  async update(id: string, updateWorkoutDto: any): Promise<Workout> {
    return this.workoutModel.findByIdAndUpdate(id, updateWorkoutDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Workout> {
    return this.workoutModel.findByIdAndDelete(id).exec();
  }
}
