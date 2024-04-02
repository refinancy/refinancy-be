import { CreateUserHandler } from './handlers/create-user.handler';
import { DeleteUserHandler } from './handlers/delete-user.handler';
import { CreateUserCommand } from './impl/create-user.command';
import { DeleteUserCommand } from './impl/delete-user.command';

export const CommandHandlers = [CreateUserHandler, DeleteUserHandler];
export const Commands = [CreateUserCommand, DeleteUserCommand];
