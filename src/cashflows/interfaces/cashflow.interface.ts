import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
export interface Cashflow extends Document {
  readonly description: string;
  readonly user_id: User;
  readonly total: number;
  readonly total_recipe_amount: number;
  readonly total_expense_amount: number;
  readonly startedAt: Date;
  readonly endedAt: Date;
}
