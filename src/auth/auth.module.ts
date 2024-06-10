import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { WiseStrategy } from './strategies/wise.strategy';
import { AuthenticateUserHandler } from './commands/handlers/authenticate-user.handler';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [WiseStrategy, AuthenticateUserHandler],
})
export class AuthModule {}
