import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkoutsDto } from '../dto/create-workouts.dto';
import { QueryWorkoutsDto } from '../dto/query-workouts.dto';
import { Workout, WorkoutDocument } from '../schemas/workouts.schema';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>,
  ) {}

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

  async createForUser(
    userId: string,
    createWorkoutDto: CreateWorkoutsDto,
  ): Promise<Workout> {
    if (!userId) {
      throw new Error('userId is required');
    }
    const createdWorkout = new this.workoutModel({
      ...createWorkoutDto,
      user_id: userId,
    });
    return createdWorkout.save();
  }

  async create(createWorkoutDto: any): Promise<Workout> {
    const createdWorkout = new this.workoutModel(createWorkoutDto);
    return createdWorkout.save();
  }

  async getForUser(userId: string): Promise<Workout[]> {
    return this.workoutModel.find({ user_id: userId }).exec();
  }

  async findUserWorkouts(
    userId: string,
    query: QueryWorkoutsDto,
  ): Promise<any> {
    const {
      page = 1,
      limit = 10,
      sortField = 'date',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Создаем объект сортировки
    const sort = sortField ? { [sortField]: sortOrder === 'asc' ? 1 : -1 } : {};

    const workouts = await this.workoutModel
      .find({ user_id: userId }) // Исправил на user_id
      .sort(sort as any)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.workoutModel
      .countDocuments({ user_id: userId }) // Исправил на user_id
      .exec();

    return {
      data: workouts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
