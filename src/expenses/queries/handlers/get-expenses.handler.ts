import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetExpensesQuery } from '../impl/get-expenses.queries';
import { Expense } from 'src/expenses/interfaces/expense.interface';
import { QueryExpenseResponse } from 'src/expenses/responses/query-expense.response';

@Injectable()
@QueryHandler(GetExpensesQuery)
export class GetExpensesHandler implements IQueryHandler<GetExpensesQuery> {
  constructor(
    private readonly query: GetExpensesQuery,
    @Inject('EXPENSE_MODEL') private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(): Promise<QueryExpenseResponse[]> {
    const expenses = await this.expenseModel.find().exec();

    return expenses;
  }
}
