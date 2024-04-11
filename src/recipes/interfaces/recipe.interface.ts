import { Document } from 'mongoose';
export interface Recipe extends Document {
  readonly title: string;
  readonly from: string;
  readonly description: string;
  readonly value: number;
  readonly receivedAt: Date;
}
