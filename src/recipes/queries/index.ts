import { GetRecipeHandler } from './handlers/get-recipe.handler';
import { GetRecipesHandler } from './handlers/get-recipes.handler';
import { GetRecipeQuery } from './impl/get-recipe.queries';
import { GetRecipesQuery } from './impl/get-recipes.queries';

export const QueryHandlers = [GetRecipesHandler, GetRecipeHandler];
export const RecipeQueries = [GetRecipeQuery, GetRecipesQuery];
