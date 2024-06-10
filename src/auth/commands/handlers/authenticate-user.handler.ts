import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import axios from 'axios';
import { AuthenticateUserCommand } from '../imp/authenticate-user.command';

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserHandler
  implements ICommandHandler<AuthenticateUserCommand>
{
  async execute(command: AuthenticateUserCommand) {
    const { accessToken } = command;
    const { data } = await axios.get(`${process.env.WISE_API_URL}/v1/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    data.accessToken = accessToken;
    return data;
  }
}
