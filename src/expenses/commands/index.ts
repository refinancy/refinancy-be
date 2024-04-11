import { CreateExpenseHandler } from './handlers/create-expense.handler';
import { DeleteExpenseHandler } from './handlers/delete-expense.handler';
import { UpdateExpenseHandler } from './handlers/update-expense.handler';
import { CreateExpenseCommand } from './impl/create-expense.command';
import { DeleteExpenseCommand } from './impl/delete-expense.command';
import { UpdateExpenseCommand } from './impl/update-expense.command';

export const CommandHandlers = [
  CreateExpenseHandler,
  DeleteExpenseHandler,
  UpdateExpenseHandler,
];
export const Commands = [
  CreateExpenseCommand,
  DeleteExpenseCommand,
  UpdateExpenseCommand,
];
