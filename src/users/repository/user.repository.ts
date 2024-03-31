import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { user } from './fixtures/user';

@Injectable()
export class UserRepository {
  async findOneByEmail(email: string): Promise<User> {
    return user;
  }

  async findAll(): Promise<User[]> {
    return [user];
  }
}
