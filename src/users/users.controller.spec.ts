import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule, UsersModule],
      controllers: [UsersController],
      providers: [...usersProviders, ...databaseProviders],
      // Importe o UsersModule aqui
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    console.log('controller', controller);
    expect(controller).toBeDefined();
  });
});
