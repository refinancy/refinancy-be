import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { ExpensesController } from './expenses.controller';
import { expensesProviders } from './expenses.providers';
import { ExpensesModule } from './expenses.module';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule, ExpensesModule],
      controllers: [ExpensesController],
      providers: [...expensesProviders, ...databaseProviders],
      // Importe o UsersModule aqui
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    console.log('controller', controller);
    expect(controller).toBeDefined();
  });
});
