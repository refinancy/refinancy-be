import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { GetUserQuery } from '../impl/get-user.queries';
import { QueryUserResponse } from 'src/users/responses/query-user.response';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(query: GetUserQuery): Promise<QueryUserResponse> {
    const { id } = query;

    const user = await this.userModel.findById(id, { password: false }).exec();
    // if not return an exception
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
