import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserResponse {
  @ApiProperty({ example: '5f4e3f3f4f3f4f3f4f3f4f3f', type: String })
  readonly _id: string;
  @ApiProperty({ example: 'John 2', type: String })
  readonly firstName: string;
  @ApiProperty({ example: 'Doe 2', type: String })
  readonly lastName: string;
  @ApiProperty({ example: 'johndoe2', type: String })
  readonly username: string;
  @ApiProperty({ example: 'johndoe2@email.com', type: String })
  readonly email: string;
}
