import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
export interface Expense extends Document {
  readonly title: string;
  readonly from: string;
  readonly description: string;
  readonly value: number;
  readonly paidAt: Date;
  readonly user_id: User;
}
