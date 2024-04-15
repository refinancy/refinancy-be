import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
export interface Recipe extends Document {
  readonly title: string;
  readonly from: string;
  readonly description: string;
  readonly value: number;
  readonly receivedAt: Date;
  readonly user: User;
}
