import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../impl/create-user.command';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/interfaces/user.interface';
import { CreateUserResponse } from 'src/users/responses/create-user.response';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResponse> {
    const user = await this.userModel.findOne({ email: command.email });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const createdUser = await this.userModel.create({
      ...command,
      password: await bcrypt.hash(command.password, 10),
    });

    const { password, ...userWithoutPassword } = createdUser.toObject();

    return userWithoutPassword;
  }
}
