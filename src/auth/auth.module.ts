import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';
import { SignInHandler } from './commands/handlers/sign-in.handler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { authProviders } from './auth.providers';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [
    forwardRef(() => DatabaseModule),
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRES_IN')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [SignInHandler, LocalStrategy, ...authProviders],
})
export class AuthModule {}
