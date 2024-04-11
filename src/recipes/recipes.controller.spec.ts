import { Test, TestingModule } from '@nestjs/testing';

import { CqrsModule } from '@nestjs/cqrs';

import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { RecipesController } from './recipes.controller';
import { RecipesModule } from './recipes.module';
import { recipesProviders } from './recipes.providers';

describe('RecipesController', () => {
  let controller: RecipesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule, DatabaseModule, RecipesModule],
      controllers: [RecipesController],
      providers: [...recipesProviders, ...databaseProviders],
      // Importe o UsersModule aqui
    }).compile();

    controller = module.get<RecipesController>(RecipesController);
  });

  it('should be defined', () => {
    console.log('controller', controller);
    expect(controller).toBeDefined();
  });
});
