import { Types } from 'mongoose';

export class CreateUserResponse {
  readonly _id: Types.ObjectId;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
