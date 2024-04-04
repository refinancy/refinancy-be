import * as mongoose from 'mongoose';

import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
