import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './repository/user.repository';
import { CommandHandlers } from './commands';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { UsersSagas } from './sagas/users.sagas';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.providers';

@Module({
  imports: [CqrsModule, DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    UsersSagas,
  ],
})
export class UsersModule {}
