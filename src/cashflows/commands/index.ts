import { CreateCashflowHandler } from './handlers/create-cashflow.handler';
import { DeleteCashflowHandler } from './handlers/delete-cashflow.handler';
import { CreateCashflowCommand } from './impl/create-cashflow.command';
import { DeleteCashflowCommand } from './impl/delete-cashflow.command';

export const CommandHandlers = [CreateCashflowHandler, DeleteCashflowHandler];
export const Commands = [CreateCashflowCommand, DeleteCashflowCommand];
