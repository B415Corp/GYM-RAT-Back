import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkoutsDto {
  @ApiProperty({
    example: '66ebe6a42333ad8ddd9f04e6',
    description: 'ID of the user',
  })
  readonly user_id: string;

  @ApiProperty({
    example: 'Workout name',
    description: 'The name of the workout',
  })
  readonly name: string;

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
  readonly date: Date;

  readonly date_create?: Date;

  readonly date_edit?: Date;
}
