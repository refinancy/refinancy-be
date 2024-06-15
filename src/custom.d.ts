import { User } from '../src/users/interfaces/user.interface';
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
