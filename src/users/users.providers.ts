import * as mongoose from 'mongoose';

import { UserSchema } from './schemas/user.schema';
import { Provider } from '@nestjs/common';

export const usersProviders: Provider[] = [
  {
    provide: 'USER_MODEL',
    useFactory: (mongoose: mongoose.Mongoose) =>
      mongoose.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
