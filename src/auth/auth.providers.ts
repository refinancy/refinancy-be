import * as mongoose from 'mongoose';
import { AuthSchema } from './schemas/auth.schema';

export const authProviders = [
  {
    provide: 'AUTH_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Auth', AuthSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];