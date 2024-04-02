import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { DeleteUserCommand } from '../impl/delete-user.command';

@Injectable()
@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(command: DeleteUserCommand) {
    // find user by email
    // if (user) {
    //   throw new Error('User not found');
    // }
    console.log('command', command);
    const ok = await this.userModel.deleteOne({ _id: command.id }).exec();
    console.log('ok', ok);
  }
}
