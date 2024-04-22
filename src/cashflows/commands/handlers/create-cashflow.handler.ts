import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateCashflowCommand } from '../impl/create-cashflow.command';
import { CreateCashflowResponse } from 'src/cashflows/responses/create-cashflow.response';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';
import { Recipe } from 'src/recipes/interfaces/recipe.interface';
import { Expense } from 'src/expenses/interfaces/expense.interface';

@Injectable()
@CommandHandler(CreateCashflowCommand)
export class CreateCashflowHandler
  implements ICommandHandler<CreateCashflowCommand>
{
  constructor(
    @Inject('CASHFLOW_MODEL')
    private readonly cashflowModel: mongoose.Model<Cashflow>,
    @Inject('RECIPE_MODEL')
    private readonly recipeModel: mongoose.Model<Recipe>,
    @Inject('EXPENSE_MODEL')
    private readonly expenseModel: mongoose.Model<Expense>,
  ) {}

  async execute(
    command: CreateCashflowCommand,
  ): Promise<CreateCashflowResponse> {
    let total_recipe_amount = 0;
    let total_expense_amount = 0;
    let total = 0;
    const recipes = await this.recipeModel
      .find({
        user_id: command.user_id,
        receivedAt: {
          $gte: new Date(command.startedAt),
          $lte: new Date(command.endedAt),
        },
      })
      .exec();

    const expenses = await this.expenseModel
      .find({
        user_id: command.user_id,
        paidAt: {
          $gte: new Date(command.startedAt),
          $lte: new Date(command.endedAt),
        },
      })
      .exec();
    for (const recipe of recipes) {
      total_recipe_amount += recipe.value;
    }
    for (const expense of expenses) {
      total_expense_amount += expense.value;
    }
    total = total_recipe_amount - total_expense_amount;
    const createdCashflow = await this.cashflowModel.create({
      ...command,
      user_id: command.user_id,
      total_recipe_amount: total_recipe_amount ?? 0,
      total_expense_amount: total_expense_amount ?? 0,
      total: total ?? 0,
    });
    return createdCashflow;
  }
}
