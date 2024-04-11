import * as mongoose from 'mongoose';
import { User } from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);
