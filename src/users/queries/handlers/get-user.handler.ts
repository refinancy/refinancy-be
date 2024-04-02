import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
import { GetUserQuery } from '../impl/get-user.queries';

@Injectable()
@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async execute(query: GetUserQuery) {
    // if not return an exception
    const { id } = query;

    const user = await this.userModel.findById(id).exec();
    console.log('user', user);
    return user;
  }
}
