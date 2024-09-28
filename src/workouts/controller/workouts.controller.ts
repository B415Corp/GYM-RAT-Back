import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkoutsDto } from '../dto/create-workouts.dto';
import { QueryWorkoutsDto } from '../dto/query-workouts.dto';
import { UpdateWorkoutsDto } from '../dto/update-workouts.dto';
import { Workout } from '../schemas/workouts.schema';
import { WorkoutsService } from '../service/workouts.service';

@ApiTags('workouts')
@ApiBearerAuth('JWT-auth') // Добавляем JWT auth в документацию Swagger
@UseGuards(JwtAuthGuard) // Применяем защиту ко всем маршрутам контроллера
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({ summary: 'Create workout' })
  @ApiBody({ type: CreateWorkoutsDto })
  @ApiResponse({ status: 201, type: Workout })
  create(@Body() createWorkoutDto: CreateWorkoutsDto): Promise<Workout> {
    return this.workoutsService.create(createWorkoutDto);
  }

  @UseGuards(JwtAuthGuard) // Защищает маршрут с помощью JWT
  @Post('me')
  @ApiOperation({ summary: 'Create workout for the current user' })
  @ApiResponse({ status: 201, description: 'Workout created successfully' })
  createWorkoutForMe(
    @Request() req,
    @Body() createWorkoutDto: CreateWorkoutsDto,
  ) {
    // req.user содержит информацию о текущем авторизованном пользователе (если используется JWT)
    const userId = req.user.userId; // Извлекаем userId из токена
    return this.workoutsService.createForUser(userId, createWorkoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get user workouts with pagination and sorting' })
  @ApiResponse({ status: 200, description: 'List of user workouts' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page',
  })
  @ApiQuery({
    name: 'sortField',
    required: false,
    type: String,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['asc', 'desc'],
    description: 'Sorting order',
  })
  async getMyWorkouts(
    @Req() req,
    @Query() query: QueryWorkoutsDto,
  ): Promise<any> {
    const userId = req.user?.userId;
    return this.workoutsService.findUserWorkouts(userId, query);
  }

  @Get()
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: 200, type: [Workout] })
  findAll(): Promise<Workout[]> {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get workout by id' })
  @ApiResponse({ status: 200, type: Workout })
  findOne(@Param('id') id: string): Promise<Workout> {
    return this.workoutsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update workout by id' })
  @ApiBody({ type: UpdateWorkoutsDto })
  @ApiResponse({ status: 200, type: Workout })
  update(
    @Param('id') id: string,
    @Body() updateWorkoutDto: UpdateWorkoutsDto,
  ): Promise<Workout> {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workout by id' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(id);
  }
}
