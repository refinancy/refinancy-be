import { CreateUserHandler } from './handlers/create-user.handler';
import { DeleteUserHandler } from './handlers/delete-user.handler';
import { UpdateUserHandler } from './handlers/update-user.handler';
import { CreateUserCommand } from './impl/create-user.command';
import { DeleteUserCommand } from './impl/delete-user.command';
import { UpdateUserCommand } from './impl/update-user.command';

export const CommandHandlers = [
  CreateUserHandler,
  DeleteUserHandler,
  UpdateUserHandler,
];
export const Commands = [
  CreateUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
];
