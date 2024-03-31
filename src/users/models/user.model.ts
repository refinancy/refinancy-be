import { AggregateRoot } from '@nestjs/cqrs';
import { CreatedUserEvent } from '../events/impl/created-user.event';
import { CreateUserDto } from '../dto/create-user.dto';

export class User extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  create(createUserDto: CreateUserDto) {
    this.apply(new CreatedUserEvent(createUserDto));
  }
}
