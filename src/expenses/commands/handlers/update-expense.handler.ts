import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateExpenseCommand } from '../impl/update-expense.command';
import { Expense } from 'src/expenses/interfaces/expense.interface';
import { UpdateExpenseResponse } from 'src/expenses/responses/update-expense.response';

@Injectable()
@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseHandler
  implements ICommandHandler<UpdateExpenseCommand>
{
  constructor(
    @Inject('EXPENSE_MODEL') private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(command: UpdateExpenseCommand): Promise<UpdateExpenseResponse> {
    const expense = await this.expenseModel.findById(command.id).exec();
    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    const updated = (await expense
      .updateOne({
        _id: command.id,
        title: command.title,
        from: command.from,
        description: command.description,
        value: command.value,
        __v: expense.__v + 1,
      })
      .exec()) as UpdateExpenseResponse;

    return updated;
  }
}
