import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: CreateUserCommand) {
    // find user by email
    // if (user) {
    //   throw new Error('User already exists');
    // }

    const createdUser = await this.userModel.create(command);
    return createdUser;
  }
}
