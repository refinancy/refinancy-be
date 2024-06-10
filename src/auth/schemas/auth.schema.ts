import * as mongoose from 'mongoose';
import { Auth } from '../interfaces/auth.interface';

export const AuthSchema = new mongoose.Schema<Auth>(
  {
    user_id: String,
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true },
);
