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
import { recipesProviders } from './recipes/recipes.providers';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesModule } from './recipes/recipes.module';
import { ExpensesController } from './expenses/expenses.controller';
import { expensesProviders } from './expenses/expenses.providers';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    RecipesModule,
    ExpensesModule,
    DatabaseModule,
    CqrsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    RecipesController,
    ExpensesController,
  ],
  providers: [
    AppService,
    ...databaseProviders,
    ...usersProviders,
    ...recipesProviders,
    ...expensesProviders,
  ],
})
export class AppModule {}
