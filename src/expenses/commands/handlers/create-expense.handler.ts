import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateExpenseCommand } from '../impl/create-expense.command';
import { Expense } from 'src/expenses/interfaces/expense.interface';
import { CreateExpenseResponse } from 'src/expenses/responses/create-expense.response';

@Injectable()
@CommandHandler(CreateExpenseCommand)
export class CreateExpenseHandler
  implements ICommandHandler<CreateExpenseCommand>
{
  constructor(
    @Inject('EXPENSE_MODEL') private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(command: CreateExpenseCommand): Promise<CreateExpenseResponse> {
    const createdExpense = await this.expenseModel.create(command);
    return createdExpense;
  }
}
