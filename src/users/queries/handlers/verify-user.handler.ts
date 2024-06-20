import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/interfaces/user.interface';
import { VerifyUserQuery } from '../impl/verify-user.queries';
import { VerifyUserResponse } from 'src/users/responses/verify-user.response';

@Injectable()
@QueryHandler(VerifyUserQuery)
export class VerifyUserHandler implements IQueryHandler<VerifyUserQuery> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(query: VerifyUserQuery): Promise<VerifyUserResponse> {
    const { email, password, user_id } = query;
    if (user_id) {
      const user = await this.userModel.findById(user_id).exec();

      if (!user) {
        throw new UnauthorizedException('Credentials are not valid.');
      }
      return user.toObject();
    } else {
      const user = await this.userModel.findOne({ email }).exec();
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new UnauthorizedException('Credentials are not valid.');
      }
      return user.toObject();
    }
  }
}
