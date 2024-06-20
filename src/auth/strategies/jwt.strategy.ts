import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payloade.interface';
import { QueryBus } from '@nestjs/cqrs';
import { VerifyUserQuery } from '@src/users/queries/impl/verify-user.queries';
import { User } from '@src/users/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configservice: ConfigService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      secretOrKey: configservice.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) =>
          request?.cookies?.Authentication ||
          request?.Authentication ||
          request?.headers.Authentication,
      ]),
    });
  }

  async validate({ user_id }: TokenPayload): Promise<User> {
    const user = await this.queryBus.execute(
      new VerifyUserQuery('', '', user_id),
    );

    return user;
  }
}
