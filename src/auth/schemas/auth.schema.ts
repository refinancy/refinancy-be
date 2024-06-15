import * as mongoose from 'mongoose';
import { Auth } from '../interfaces/auth.interface';

export const AuthSchema = new mongoose.Schema<Auth>(
  {
    id: String,
    user_id: String,
  },
  { timestamps: true },
);
