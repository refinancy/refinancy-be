import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: CreateUserCommand) {
    const user = await this.userModel.findOne({ email: command.email });
    // find user by email
    console.log('useruseruser', user);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    // refactor to use a repository
    const createdUser = await this.userModel.create(command);
    return createdUser;
  }
}
