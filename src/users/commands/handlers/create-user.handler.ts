import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { CreateUserResponse } from 'src/users/responses/create-user.response';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    const user = await this.userModel.findOne({ email: command.email });
    // find user by email
    if (user) {
      throw new BadRequestException('User already exists');
    }
    // refactor to use a repository
    const createdUser = await this.userModel.create(command);
    return createdUser;
  }
}
