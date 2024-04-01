import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/repository/user.repository';
import { CreateUserCommand } from '../impl/create-user.command';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    // private readonly repository: UserRepository,
    private readonly command: CreateUserCommand,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  async execute(command: CreateUserCommand) {
    const { email, firstName, lastName, password, username } = command;
    // find user by email
    // if (user) {
    //   throw new Error('User already exists');
    // }
    const createdUser = await this.userModel.create(command);
    createdUser.save();
  }
}
