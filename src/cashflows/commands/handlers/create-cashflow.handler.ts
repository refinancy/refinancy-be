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
    console.log('command', command);
    const startedAt = new Date(command.startedAt);
    const endedAt = new Date(command.endedAt);
    const recipes = await this.recipeModel
      .find({
        user_id: command.user_id,
        receivedAt: { $gte: startedAt, $lte: endedAt },
      })
      .exec();
    console.log('recipes', recipes);
    const createdCashflow = await this.cashflowModel.create({
      ...command,
      user_id: command.user_id,
    });
    return {
      ...createdCashflow.toObject(),
      total_recipe_amount: 0,
      total_expense_amount: 0,
      total: 0,
    };
  }
}
