import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { UpdateRecipeCommand } from '../impl/update-recipe.command';
import { UpdateRecipeResponse } from 'src/recipes/responses/update-recipe.response';

@Injectable()
@CommandHandler(UpdateRecipeCommand)
export class UpdateRecipeHandler
  implements ICommandHandler<UpdateRecipeCommand>
{
  constructor(
    @Inject('RECIPE_MODEL') private readonly recipeModel: Model<Recipe>,
  ) {}

  async execute(command: UpdateRecipeCommand): Promise<UpdateRecipeResponse> {
    const recipe = await this.recipeModel.findById(command.id).exec();
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const updated = (await recipe
      .updateOne({
        _id: command.id,
        title: command.title,
        from: command.from,
        description: command.description,
        value: command.value,
        __v: recipe.__v + 1,
      })
      .exec()) as UpdateRecipeResponse;

    return updated;
  }
}
