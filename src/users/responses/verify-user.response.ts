import { ApiProperty } from '@nestjs/swagger';
import { User } from '../interfaces/user.interface';

export class VerifyUserResponse {
  @ApiProperty()
  readonly user: User;
}
