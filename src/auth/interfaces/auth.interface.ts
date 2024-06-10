import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';
export interface Auth extends Document {
  readonly user_id: User;
  readonly startedAt: Date;
  readonly endedAt: Date;
}
