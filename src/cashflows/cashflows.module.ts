import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, Commands } from './commands';
import { DatabaseModule } from '../database/database.module';
import { CashflowsController } from './cashflows.controller';
import { cashflowsProviders } from './cashflows.providers';
import { CashflowQueries, QueryHandlers } from './queries';

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule)],
  controllers: [CashflowsController],
  providers: [
    ...cashflowsProviders,
    ...CommandHandlers,
    ...Commands,
    ...QueryHandlers,
    ...CashflowQueries,
  ],
})
export class CashflowsModule {}
