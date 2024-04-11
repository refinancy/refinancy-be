import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { DeleteRecipeCommand } from '../impl/delete-recipe.command';

@Injectable()
@CommandHandler(DeleteRecipeCommand)
export class DeleteRecipeHandler
  implements ICommandHandler<DeleteRecipeCommand>
{
  constructor(
    @Inject('RECIPE_MODEL') private readonly recipeModel: Model<Recipe>,
  ) {}

  async execute(command: DeleteRecipeCommand) {
    const recipe = await this.recipeModel.findById(command.id);
    // find recipe by email
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    await this.recipeModel.deleteOne({ _id: command.id }).exec();
  }
}
