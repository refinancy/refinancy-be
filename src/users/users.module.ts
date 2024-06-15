import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers, Commands } from './commands';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { QueryHandlers, UserQueries } from './queries';

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule)],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    ...CommandHandlers,
    ...Commands,
    ...QueryHandlers,
    ...UserQueries,
  ],
})
export class UsersModule {}

// create response file
// apply validation ( joi )
// apply tests
// create user repository and remove code dupplication
