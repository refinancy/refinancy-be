import { GetExpenseHandler } from './handlers/get-expense.handler';
import { GetExpensesHandler } from './handlers/get-expenses.handler';
import { GetExpenseQuery } from './impl/get-expense.queries';
import { GetExpensesQuery } from './impl/get-expenses.queries';

export const QueryHandlers = [GetExpensesHandler, GetExpenseHandler];
export const ExpenseQueries = [GetExpenseQuery, GetExpensesQuery];
