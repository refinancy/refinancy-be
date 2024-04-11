import * as mongoose from 'mongoose';
import { Cashflow } from '../interfaces/cashflow.interface';

export const CashflowSchema = new mongoose.Schema<Cashflow>(
  {
    description: String,
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true },
);
