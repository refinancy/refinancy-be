import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { DeleteCashflowCommand } from '../impl/delete-cashflow.command';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';

@Injectable()
@CommandHandler(DeleteCashflowCommand)
export class DeleteCashflowHandler
  implements ICommandHandler<DeleteCashflowCommand>
{
  constructor(
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
  ) {}

  async execute(command: DeleteCashflowCommand) {
    const cashflow = await this.cashflowModel.findById(command.id);

    if (!cashflow) {
      throw new NotFoundException('Cashflow not found');
    }

    await this.cashflowModel.deleteOne({ _id: command.id }).exec();
  }
}
