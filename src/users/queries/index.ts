import { GetUserHandler } from './handlers/get-user.handler';
import { GetUsersHandler } from './handlers/get-users.handler';
import { GetUserQuery } from './impl/get-user.queries';
import { GetUsersQuery } from './impl/get-users.queries';

export const QueryHandlers = [GetUsersHandler, GetUserHandler];
export const UserQueries = [GetUserQuery, GetUsersQuery];
