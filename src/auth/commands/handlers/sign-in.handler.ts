import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../imp/sign-in.command';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/auth/interfaces/token-payloade.interface';
import { Auth } from 'src/auth/interfaces/auth.interface';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject('AUTH_MODEL') private readonly authModel: Model<Auth>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async execute(command: SignInCommand) {
    const tokenPayload: TokenPayload = { userId: command.user.id };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRES_IN'),
    );
    const token = this.jwtService.sign(tokenPayload);
    command.response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
    });
    return token;
  }
}
