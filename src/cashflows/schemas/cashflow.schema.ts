import * as mongoose from 'mongoose';
import { Cashflow } from '../interfaces/cashflow.interface';

export const CashflowSchema = new mongoose.Schema<Cashflow>(
  {
    description: String,
    user_id: String,
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true },
);
