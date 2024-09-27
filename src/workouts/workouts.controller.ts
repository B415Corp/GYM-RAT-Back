import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateWorkoutsDto } from './create-user.dto';
import { Workout } from './schemas/workouts.schema';
import { UpdateWorkoutsDto } from './update-user.dto';
import { WorkoutsService } from './workouts.service';

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
