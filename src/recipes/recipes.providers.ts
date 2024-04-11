import * as mongoose from 'mongoose';
import { RecipeSchema } from './schemas/recipe.schema';

export const recipesProviders = [
  {
    provide: 'RECIPE_MODEL',
    useFactory: (connection: mongoose.Connection) =>
      connection.model('Recipe', RecipeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
