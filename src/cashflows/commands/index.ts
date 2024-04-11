import { CreateCashflowHandler } from './handlers/create-cashflow.handler';
import { DeleteCashflowHandler } from './handlers/delete-cashflow.handler';
import { UpdateCashflowHandler } from './handlers/update-cashflow.handler';
import { CreateCashflowCommand } from './impl/create-cashflow.command';
import { DeleteCashflowCommand } from './impl/delete-cashflow.command';
import { UpdateCashflowCommand } from './impl/update-cashflow.command';

export const CommandHandlers = [
  CreateCashflowHandler,
  DeleteCashflowHandler,
  UpdateCashflowHandler,
];
export const Commands = [
  CreateCashflowCommand,
  DeleteCashflowCommand,
  UpdateCashflowCommand,
];
