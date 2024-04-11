import { Document } from 'mongoose';
export interface Cashflow extends Document {
  readonly description: string;
  readonly startedAt: Date;
  readonly endedAt: Date;
}
