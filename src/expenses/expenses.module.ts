import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, Commands } from './commands';
import { DatabaseModule } from '../database/database.module';
import { QueryHandlers, ExpenseQueries } from './queries';
import { ExpensesController } from './expenses.controller';
import { expensesProviders } from './expenses.providers';

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule)],
  controllers: [ExpensesController],
  providers: [
    ...expensesProviders,
    ...CommandHandlers,
    ...Commands,
    ...QueryHandlers,
    ...ExpenseQueries,
  ],
})
export class ExpensesModule {}
