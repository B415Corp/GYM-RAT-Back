import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkoutsDto {
  @ApiProperty({ example: 'admin', description: 'The name of the user' })
  readonly user_id?: string;
  @ApiProperty({
    example: 'Workout name',
    description: 'The name of the workout',
  })
  readonly name?: string;
  @ApiProperty({
    example: 'Workout description',
    description: 'The description of the workout',
    required: false,
  })
  readonly description?: string;
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the workout',
  })
  readonly date?: Date;
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date when the workout was created',
    required: false,
  })
  readonly date_create?: Date;
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date when the workout was last edited',
    required: false,
  })
  readonly date_edit?: Date;
}
