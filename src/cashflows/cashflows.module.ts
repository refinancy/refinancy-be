import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, Commands } from './commands';
import { DatabaseModule } from '../database/database.module';
import { CashflowsController } from './cashflows.controller';
import { cashflowsProviders } from './cashflows.providers';
import { CashflowQueries, QueryHandlers } from './queries';
import { RecipesModule } from 'src/recipes/recipes.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { recipesProviders } from 'src/recipes/recipes.providers';
import { expensesProviders } from 'src/expenses/expenses.providers';
import { ExpensesController } from 'src/expenses/expenses.controller';
import { RecipesController } from 'src/recipes/recipes.controller';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => DatabaseModule),
    RecipesModule,
    ExpensesModule,
  ],
  controllers: [CashflowsController, ExpensesController, RecipesController],
  providers: [
    ...cashflowsProviders,
    ...recipesProviders,
    ...expensesProviders,
    ...CommandHandlers,
    ...Commands,
    ...QueryHandlers,
    ...CashflowQueries,
  ],
})
export class CashflowsModule {}
