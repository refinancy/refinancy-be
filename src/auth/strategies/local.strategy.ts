import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { VerifyUserQuery } from 'src/users/queries/impl/verify-user.queries';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<VerifyUserQuery> {
    const user = await this.queryBus.execute(
      new VerifyUserQuery(email, password),
    );
    return user;
  }
}
