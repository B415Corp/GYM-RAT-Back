import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'admin', description: 'The name of the user' })
  readonly name: string;
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the user',
  })
  readonly email: string;
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  readonly password: string;
  @ApiProperty({ example: 'user', description: 'The role of the user' })
  readonly role: string;
  @ApiProperty({
    example: 'active',
    description: 'The status of the user',
    required: false,
  })
  readonly status?: string;
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the user creation',
    required: false,
  })
  readonly date_create?: Date;
  @ApiProperty({
    example: new Date().toISOString(),
    description: 'The date of the user edit',
    required: false,
  })
  readonly date_edit?: Date;
}
