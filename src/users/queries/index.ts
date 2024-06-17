import { GetUserHandler } from './handlers/get-user.handler';
import { GetUsersHandler } from './handlers/get-users.handler';
import { VerifyUserHandler } from './handlers/verify-user.handler';
import { GetUserQuery } from './impl/get-user.queries';
import { GetUsersQuery } from './impl/get-users.queries';
import { VerifyUserQuery } from './impl/verify-user.queries';

export const QueryHandlers = [
  GetUsersHandler,
  GetUserHandler,
  VerifyUserHandler,
];
export const UserQueries = [GetUserQuery, GetUsersQuery, VerifyUserQuery];
