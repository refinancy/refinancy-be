import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cashflow } from 'src/cashflows/interfaces/cashflow.interface';
import { QueryCashflowResponse } from 'src/cashflows/responses/query-cashflow.response';
import { GetCashflowsQuery } from '../impl/get-cashflows.queries';

@Injectable()
@QueryHandler(GetCashflowsQuery)
export class GetCashflowsHandler implements IQueryHandler<GetCashflowsQuery> {
  constructor(
    private readonly query: GetCashflowsQuery,
    @Inject('CASHFLOW_MODEL') private readonly cashflowModel: Model<Cashflow>,
  ) {}

  async execute(): Promise<QueryCashflowResponse[]> {
    const cashflows = await this.cashflowModel.find().exec();

    return cashflows;
  }
}
