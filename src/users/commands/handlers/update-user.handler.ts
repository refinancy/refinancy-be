import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { UpdateUserCommand } from '../impl/update-user.command';
import { UpdateUserResponse } from 'src/users/responses/update-user.response';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: UpdateUserCommand): Promise<UpdateUserResponse> {
    const user = await this.userModel.findById(command.id).exec();
    const users = await this.userModel.find().exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // verify if this email already exists
    // Time Complexity O(n) * Perform it using some db schema if email is unique ( if exists)
    for (const user in users) {
      if (users[user].email === command.email) {
        throw new BadRequestException('Email already exists');
      }
    }
    const updated = (await user
      .updateOne({
        firstName: command.firstName,
        lastName: command.lastName,
        username: command.username,
        email: command.email,
        password: command.password,
      })
      .exec()) as UpdateUserResponse;
    return updated;
  }
}
