import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
export interface Cashflow extends Document {
  readonly description: string;
  readonly user_id: User;
  readonly startedAt: Date;
  readonly endedAt: Date;
}
