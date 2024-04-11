import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { tags } from 'src/swagger';
import { DeleteCashflowDto } from './dto/delete-cashflow.dto';
import { DeleteCashflowCommand } from './commands/impl/delete-cashflow.command';
import { UpdateCashflowCommand } from './commands/impl/update-cashflow.command';
import { UpdateCashflowResponse } from './responses/update-cashflow.response';
import { UpdateCashflowDto } from './dto/update-cashflow.dto';
import { QueryCashflowResponse } from './responses/query-cashflow.response';
import { FindOneCashflowDto } from './dto/find-one-cashflow.dto';
import { CreateCashflowCommand } from './commands/impl/create-cashflow.command';
import { CreateCashflowDto } from './dto/create-cashflow.dto';
import { CreateCashflowResponse } from './responses/create-cashflow.response';
import { GetCashflowQuery } from './queries/impl/get-cashflow.queries';
import { GetCashflowsQuery } from './queries/impl/get-cashflows.queries';

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

  @Get(':id')
  @ApiOperation({
    summary: `Show Cashflow.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: QueryCashflowResponse,
    description: 'Cashflow found.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param() params: FindOneCashflowDto,
  ): Promise<QueryCashflowResponse> {
    return this.queryBus.execute(new GetCashflowQuery(params.id));
  }

  @Put(':id')
  @ApiOperation({
    summary: `Update Cashflow.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: UpdateCashflowResponse,
    description: 'Cashflow updated.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  update(
    @Param('id') id: string,
    @Body() updateCashflowDto: UpdateCashflowDto,
  ): Promise<UpdateCashflowResponse> {
    return this.commandBus.execute(
      new UpdateCashflowCommand(
        id,
        updateCashflowDto.description,
        updateCashflowDto.startedAt,
        updateCashflowDto.endedAt,
      ),
    );
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
