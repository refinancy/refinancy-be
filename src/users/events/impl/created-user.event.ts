import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreatedUserEvent {
  constructor(public readonly createUserDto: CreateUserDto) {}
}
