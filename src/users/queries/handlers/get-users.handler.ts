import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { GetUsersQuery } from '../impl/get-users.queries';
import { UserRepository } from 'src/users/repository/user.repository';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUsersQuery) {
    console.log(clc.yellowBright('Async GetHeroesQuery...'));
    return this.repository.findAll();
  }
}
