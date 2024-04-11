import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { QueryRecipeResponse } from 'src/recipes/responses/query-recipe.response';
import { GetRecipesQuery } from '../impl/get-recipes.queries';

@Injectable()
@QueryHandler(GetRecipesQuery)
export class GetRecipesHandler implements IQueryHandler<GetRecipesQuery> {
  constructor(
    private readonly query: GetRecipesQuery,
    @Inject('RECIPE_MODEL') private readonly recipeModel: Model<Recipe>,
  ) {}

  async execute(): Promise<QueryRecipeResponse[]> {
    const recipes = await this.recipeModel.find().exec();

    return recipes;
  }
}
