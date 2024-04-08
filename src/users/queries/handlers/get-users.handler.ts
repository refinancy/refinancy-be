import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../impl/get-users.queries';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { QueryUserResponse } from 'src/users/responses/query-user.response';

@Injectable()
@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly query: GetUsersQuery,
    @Inject('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  async execute(): Promise<QueryUserResponse[]> {
    return await this.userModel.find().exec();
  }
}
