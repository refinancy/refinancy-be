import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { databaseProviders } from './database/database.providers';
import { usersProviders } from './users/users.providers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DatabaseModule,
    CqrsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, ...databaseProviders, ...usersProviders],
})
export class AppModule {}
