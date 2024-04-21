import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateRecipeCommand } from '../impl/create-recipe.command';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { CreateRecipeResponse } from 'src/recipes/responses/create-recipe.response';

@Injectable()
@CommandHandler(CreateRecipeCommand)
export class CreateRecipeHandler
  implements ICommandHandler<CreateRecipeCommand>
{
  constructor(
    @Inject('RECIPE_MODEL') private readonly recipeModel: Model<Recipe>,
  ) {}

  async execute(command: CreateRecipeCommand): Promise<CreateRecipeResponse> {
    const createdRecipe = await this.recipeModel.create({
      ...command,
      receivedAt: new Date(),
      user: command.user_id,
    });
    return createdRecipe;
  }
}
