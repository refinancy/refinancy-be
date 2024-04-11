import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';
import { GetCashflowQuery } from '../impl/get-cashflow.queries';
import { QueryCashflowResponse } from 'src/cashflows/responses/query-cashflow.response';

@Injectable()
@QueryHandler(GetCashflowQuery)
export class GetCashflowHandler implements IQueryHandler<GetCashflowQuery> {
  constructor(
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
  ) {}

  async execute(query: GetCashflowQuery): Promise<QueryCashflowResponse> {
    const { id } = query;

    const cashflow = await this.cashflowModel.findById(id).exec();

    if (!cashflow) {
      throw new NotFoundException('Cashflow not found');
    }

    return cashflow;
  }
}
