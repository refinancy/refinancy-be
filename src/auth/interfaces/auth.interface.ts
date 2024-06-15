import { User } from 'src/users/interfaces/user.interface';

export interface Auth extends Document {
  readonly id: string;
  readonly user_id: Pick<User, 'id'>;
}
