import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { UpdateUserCommand } from '../impl/update-user.command';

@Injectable()
@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: UpdateUserCommand) {
    const ok = await this.userModel.findById({ _id: command.id }).exec();
    const updated = await ok
      .updateOne({
        firstName: command.firstName,
        lastName: command.lastName,
        username: command.username,
        email: command.email,
        password: command.password,
      })
      .exec();
    return updated;
  }
}
