import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { DeleteUserCommand } from '../impl/delete-user.command';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: DeleteUserCommand) {
    const user = await this.userModel.findById(command.id);
    // find user by email
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userModel.deleteOne({ _id: command.id }).exec();
  }
}
