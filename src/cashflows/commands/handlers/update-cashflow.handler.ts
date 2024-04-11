import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UpdateCashflowCommand } from '../impl/update-cashflow.command';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';
import { UpdateCashflowResponse } from 'src/cashflows/responses/update-cashflow.response';

@Injectable()
@CommandHandler(UpdateCashflowCommand)
export class UpdateCashflowHandler
  implements ICommandHandler<UpdateCashflowCommand>
{
  constructor(
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
  ) {}

  async execute(
    command: UpdateCashflowCommand,
  ): Promise<UpdateCashflowResponse> {
    const cashflow = await this.cashflowModel.findById(command.id).exec();
    if (!cashflow) {
      throw new NotFoundException('Cashflow not found');
    }

    const updated = (await cashflow
      .updateOne({
        _id: command.id,
        description: command.description,
        startedAt: command.startedAt,
        endedAt: command.endedAt,
        __v: cashflow.__v + 1,
      })
      .exec()) as UpdateCashflowResponse;

    return updated;
  }
}
