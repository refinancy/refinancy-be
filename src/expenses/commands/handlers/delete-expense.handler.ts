import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { DeleteExpenseCommand } from '../impl/delete-expense.command';
import { Expense } from 'src/expenses/interfaces/expense.interface';

@Injectable()
@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseHandler
  implements ICommandHandler<DeleteExpenseCommand>
{
  constructor(
    @Inject('EXPENSE_MODEL') private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(command: DeleteExpenseCommand) {
    const expense = await this.expenseModel.findById(command.id);
    // find expense by email
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    await this.expenseModel.deleteOne({ _id: command.id }).exec();
  }
}
