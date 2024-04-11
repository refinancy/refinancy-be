import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { GetExpenseQuery } from '../impl/get-expense.queries';
import { Expense } from 'src/expenses/interfaces/expense.interface';
import { QueryExpenseResponse } from 'src/expenses/responses/query-expense.response';

@Injectable()
@QueryHandler(GetExpenseQuery)
export class GetExpenseHandler implements IQueryHandler<GetExpenseQuery> {
  constructor(
    @Inject('EXPENSE_MODEL') private readonly expenseModel: Model<Expense>,
  ) {}

  async execute(query: GetExpenseQuery): Promise<QueryExpenseResponse> {
    const { id } = query;

    const expense = await this.expenseModel.findById(id).exec();

    if (!expense) {
      throw new NotFoundException('Expense not found');
    }

    return expense;
  }
}
