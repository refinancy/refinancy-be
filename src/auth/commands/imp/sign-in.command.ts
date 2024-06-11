import { Response } from 'express';
import { User } from 'src/users/interfaces/user.interface';

export class SignInCommand {
  constructor(
    public readonly user: User,
    public readonly response: Response,
  ) {}
}
