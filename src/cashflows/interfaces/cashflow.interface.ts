import { Document } from 'mongoose';
export interface Cashflow extends Document {
  readonly description: string;
  readonly user_id: string;
  readonly startedAt: Date;
  readonly endedAt: Date;
}
