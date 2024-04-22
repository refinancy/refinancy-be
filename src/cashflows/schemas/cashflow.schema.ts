import * as mongoose from 'mongoose';
import { Cashflow } from '../interfaces/cashflow.interface';

export const CashflowSchema = new mongoose.Schema<Cashflow>(
  {
    description: String,
    user_id: String,
    total: Number,
    total_recipe_amount: Number,
    total_expense_amount: Number,
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true },
);
