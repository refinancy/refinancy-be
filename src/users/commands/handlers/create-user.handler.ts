import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const { email, firstName, lastName, password, username } = command;
    const user = await this.repository.findOneByEmail(email);
    if (user) {
      throw new Error('User already exists');
    }
    user.create({ email, firstName, lastName, password, username });
    // await this.repository.(user);
    // user.commit();
  }
}
