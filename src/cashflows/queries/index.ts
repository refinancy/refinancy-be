import { GetCashflowHandler } from './handlers/get-cashflow.handler';
import { GetCashflowsHandler } from './handlers/get-cashflows.handler';
import { GetCashflowByUserIdQuery } from './impl/get-cashflow.queries';
import { GetCashflowsQuery } from './impl/get-cashflows.queries';

export const QueryHandlers = [GetCashflowsHandler, GetCashflowHandler];
export const CashflowQueries = [GetCashflowByUserIdQuery, GetCashflowsQuery];
