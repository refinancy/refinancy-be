import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'First Name.',
    example: 'John',
  })
  readonly firstName: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Last Name.',
    example: 'Doe',
  })
  readonly lastName: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Username.',
    example: 'johndoe',
  })
  readonly username: string;

  @ApiProperty({
    type: String,
    description: 'Email.',
    example: 'johndoe@email.com',
  })
  readonly email: string;

  @ApiProperty({ example: '123456', type: String, description: 'Password.' })
  readonly password: string;
}
