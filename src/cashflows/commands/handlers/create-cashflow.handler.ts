import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateCashflowCommand } from '../impl/create-cashflow.command';
import { CreateCashflowResponse } from 'src/cashflows/responses/create-cashflow.response';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';

@Injectable()
@CommandHandler(CreateCashflowCommand)
export class CreateCashflowHandler
  implements ICommandHandler<CreateCashflowCommand>
{
  constructor(
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
  ) {}

  async execute(
    command: CreateCashflowCommand,
  ): Promise<CreateCashflowResponse> {
    const createdCashflow = await this.cashflowModel.create(command);
    return createdCashflow;
  }
}
