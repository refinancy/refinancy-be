import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers, Commands } from './commands';
import { DatabaseModule } from '../database/database.module';
import { QueryHandlers, RecipeQueries } from './queries';
import { RecipesController } from './recipes.controller';
import { recipesProviders } from './recipes.providers';

@Module({
  imports: [CqrsModule, forwardRef(() => DatabaseModule)],
  controllers: [RecipesController],
  providers: [
    ...recipesProviders,
    ...CommandHandlers,
    ...Commands,
    ...QueryHandlers,
    ...RecipeQueries,
  ],
})
export class RecipesModule {}
