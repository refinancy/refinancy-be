import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty({ example: '5f4e3f3f4f3f4f3f4f3f4f3f', type: String })
  readonly _id: string;
  @ApiProperty({ example: 'John', type: String })
  readonly firstName: string;
  @ApiProperty({ example: 'Doe', type: String })
  readonly lastName: string;
  @ApiProperty({ example: 'johndoe', type: String })
  readonly username: string;
  @ApiProperty({ example: 'johndoe@email.com', type: String })
  readonly email: string;
}
