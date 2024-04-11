import { CreateRecipeHandler } from './handlers/create-recipe.handler';
import { DeleteRecipeHandler } from './handlers/delete-recipe.handler';
import { UpdateRecipeHandler } from './handlers/update-recipe.handler';
import { CreateRecipeCommand } from './impl/create-recipe.command';
import { DeleteRecipeCommand } from './impl/delete-recipe.command';
import { UpdateRecipeCommand } from './impl/update-recipe.command';

export const CommandHandlers = [
  CreateRecipeHandler,
  DeleteRecipeHandler,
  UpdateRecipeHandler,
];
export const Commands = [
  CreateRecipeCommand,
  DeleteRecipeCommand,
  UpdateRecipeCommand,
];
