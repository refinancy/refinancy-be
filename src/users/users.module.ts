import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';

import { CommandHandlers, Commands } from './commands';
import { EventHandlers } from './events/handlers';

import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';
import { QueryHandlers, UserQueries } from './queries';

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule)],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    ...CommandHandlers,
    ...Commands,
    ...EventHandlers,
    ...QueryHandlers,
    ...UserQueries,
  ],
})
export class UsersModule {}

// create response file
// apply swagger
// apply validation ( zod )
// apply tests
// create user repository and remove code dupplication
// apply exception handler
