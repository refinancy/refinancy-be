import { Document } from 'mongoose';
export interface Expense extends Document {
  readonly title: string;
  readonly from: string;
  readonly description: string;
  readonly value: number;
  readonly paidAt: Date;
}
