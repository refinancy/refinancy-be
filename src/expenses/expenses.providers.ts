import * as mongoose from 'mongoose';
import { ExpenseSchema } from './schemas/expense.schema';

export const expensesProviders = [
  {
    provide: 'EXPENSE_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Expense', ExpenseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
