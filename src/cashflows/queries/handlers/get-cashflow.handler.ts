import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';
import { GetCashflowByUserIdQuery } from '../impl/get-cashflow.queries';
import { QueryCashflowResponse } from 'src/cashflows/responses/query-cashflow.response';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { Expense } from 'src/expenses/interfaces/expense.interface';
import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';

@Injectable()
@QueryHandler(GetCashflowByUserIdQuery)
export class GetCashflowHandler
  implements IQueryHandler<GetCashflowByUserIdQuery>
{
  constructor(
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
    @Inject('RECIPE_MODEL')
    private readonly recipeModel: Model<Recipe>,
    @Inject('EXPENSE_MODEL')
    private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(
    query: GetCashflowByUserIdQuery,
  ): Promise<QueryCashflowResponse> {
    const { user_id } = query;
    console.log('user_id', user_id);
    let total_recipe_amount = 0;
    let total_expense_amount = 0;
    let total = 0;
    const recipes = await this.recipeModel
      .find({
        user_id: user_id,
        receivedAt: {
          $gte: startOfMonth(startOfDay(new Date())),
          $lte: endOfMonth(endOfDay(new Date())),
        },
      })
      .exec();

    const expenses = await this.expenseModel
      .find({
        user_id: user_id,
        paidAt: {
          $gte: startOfMonth(startOfDay(new Date())),
          $lte: endOfMonth(endOfDay(new Date())),
        },
      })
      .exec();
    console.log('recipes and expenses', recipes, expenses);
    for (const recipe of recipes) {
      total_recipe_amount += recipe.value;
    }
    for (const expense of expenses) {
      total_expense_amount += expense.value;
    }
    total = total_recipe_amount - total_expense_amount;
    return {
      _id: new Types.ObjectId().toString(),
      description: 'Cashflow',
      total: total ?? 0,
      total_recipe_amount,
      total_expense_amount,
    };
  }
}
