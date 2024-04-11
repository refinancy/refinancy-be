import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { CashflowsController } from './cashflows.controller';
import { CashflowsModule } from './cashflows.module';
import { cashflowsProviders } from './cashflows.providers';

describe('CashflowsController', () => {
  let controller: CashflowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule, CashflowsModule],
      controllers: [CashflowsController],
      providers: [...cashflowsProviders, ...databaseProviders],
    }).compile();

    controller = module.get<CashflowsController>(CashflowsController);
  });

  it('should be defined', () => {
    console.log('controller', controller);
    expect(controller).toBeDefined();
  });
});
