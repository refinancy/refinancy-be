import * as mongoose from 'mongoose';
import { CashflowSchema } from './schemas/cashflow.schema';

export const cashflowsProviders = [
  {
    provide: 'CASHFLOW_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Cashflow', CashflowSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
