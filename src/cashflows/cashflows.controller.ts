import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tags } from 'src/swagger';
import { DeleteCashflowDto } from './dto/delete-cashflow.dto';
import { DeleteCashflowCommand } from './commands/impl/delete-cashflow.command';
import { QueryCashflowResponse } from './responses/query-cashflow.response';
import { FindOneCashflowDto } from './dto/find-one-cashflow.dto';
import { CreateCashflowCommand } from './commands/impl/create-cashflow.command';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { CreateCashflowResponse } from './responses/create-cashflow.response';
import { GetCashflowsQuery } from './queries/impl/get-cashflows.queries';
import { GetCashflowByUserIdQuery } from './queries/impl/get-cashflow.queries';

@ApiTags(tags.cashflows.name)
@Controller('cashflows')
export class CashflowsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: `Create Cashflow.`,
  })
  @ApiResponse({
    status: 201,
    type: CreateCashflowResponse,
    description: 'The cashflow has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async create(
    @Body() createCashflowDto: CreateCashflowDto,
  ): Promise<CreateCashflowResponse> {
    return this.commandBus.execute(
      new CreateCashflowCommand(
        createCashflowDto.description,
        createCashflowDto.user_id,
        createCashflowDto.startedAt,
        createCashflowDto.endedAt,
      ),
    );
  }

  @Get()
  @ApiOperation({
    summary: `List Cashflow.`,
  })
  @ApiResponse({
    status: 200,
    type: QueryCashflowResponse,
    description: 'List of cashflows.',
  })
  async findAll(): Promise<QueryCashflowResponse[]> {
    return this.queryBus.execute(new GetCashflowsQuery());
  }

  @Get(':user_id')
  @ApiOperation({
    summary: `Show Cashflow.`,
  })
  @ApiParam({ name: 'user_id', type: String })
  @ApiResponse({
    status: 200,
    type: QueryCashflowResponse,
    description: 'Cashflow found.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param() params: FindOneCashflowDto,
  ): Promise<QueryCashflowResponse> {
    return this.queryBus.execute(new GetCashflowByUserIdQuery(params.user_id));
  }
  @Delete(':id')
  @ApiOperation({
    summary: `Delete Cashflow.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 204, description: 'No content.' })
  async remove(@Param() params: DeleteCashflowDto): Promise<void> {
    return this.commandBus.execute(new DeleteCashflowCommand(params.id));
  }
}
