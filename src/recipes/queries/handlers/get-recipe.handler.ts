import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { QueryRecipeResponse } from 'src/recipes/responses/query-recipe.response';
import { GetRecipeQuery } from '../impl/get-recipe.queries';

@Injectable()
@QueryHandler(GetRecipeQuery)
export class GetRecipeHandler implements IQueryHandler<GetRecipeQuery> {
  constructor(
    @Inject('RECIPE_MODEL') private readonly recipeModel: Model<Recipe>,
  ) {}

  async execute(query: GetRecipeQuery): Promise<QueryRecipeResponse> {
    const { id } = query;

    const recipe = await this.recipeModel.findById(id).exec();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }
}
