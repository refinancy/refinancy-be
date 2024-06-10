import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateUserCommand } from './commands/imp/authenticate-user.command';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly jwtService: JwtService,
  ) {}

  @Get('wise')
  @UseGuards(AuthGuard('wise'))
  wiseAuth() {
    // Redirect to Wise login page.
  }

  @Get('wise/callback')
  @UseGuards(AuthGuard('wise'))
  async wiseAuthCallback(@Req() req: Request, @Res() res: Response) {
    const user = await this.commandBus.execute(
      new AuthenticateUserCommand(req.user.accessToken),
    );
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    res.json({ access_token: token });
  }
}
