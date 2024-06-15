import { Controller, Post, Res, UseGuards } from '@nestjs/common';

import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SignInCommand } from './commands/imp/sign-in.command';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from 'src/users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = this.commandBus.execute(new SignInCommand(user, response));
    response.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  async authenticate(data: any) {
    return data.user;
  }
}
