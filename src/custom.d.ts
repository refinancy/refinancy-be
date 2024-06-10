// src/custom.d.ts
import { User } from './auth/user.entity'; // Substitua pelo caminho correto da sua entidade User

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
