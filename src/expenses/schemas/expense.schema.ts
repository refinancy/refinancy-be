import * as mongoose from 'mongoose';

import { Expense } from '../interfaces/expense.interface';

export const ExpenseSchema = new mongoose.Schema<Expense>(
  {
    title: String,
    from: String,
    description: String,
    value: Number,
    paidAt: Date,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);
