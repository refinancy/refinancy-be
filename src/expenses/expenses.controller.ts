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
import { CreateExpenseResponse } from './responses/create-expense.response';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { CreateExpenseCommand } from './commands/impl/create-expense.command';
import { QueryExpenseResponse } from './responses/query-expense.response';
import { GetExpensesQuery } from './queries/impl/get-expenses.queries';
import { FindOneExpenseDto } from './dto/find-one-expense.dto';
import { GetExpenseQuery } from './queries/impl/get-expense.queries';
import { UpdateExpenseResponse } from './responses/update-expense.response';
import { UpdateExpenseCommand } from './commands/impl/update-expense.command';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { DeleteExpenseDto } from './dto/delete-expense.dto';
import { DeleteExpenseCommand } from './commands/impl/delete-expense.command';

@ApiTags(tags.users.name)
@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: `Create Expense.`,
  })
  @ApiResponse({
    status: 201,
    type: CreateExpenseResponse,
    description: 'The expense has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<CreateExpenseResponse> {
    return this.commandBus.execute(
      new CreateExpenseCommand(
        createExpenseDto.title,
        createExpenseDto.from,
        createExpenseDto.description,
        createExpenseDto.value,
        createExpenseDto.paidAt,
      ),
    );
  }

  @Get()
  @ApiOperation({
    summary: `List Expense.`,
  })
  @ApiResponse({
    status: 200,
    type: QueryExpenseResponse,
    description: 'List of expenses.',
  })
  async findAll(): Promise<QueryExpenseResponse[]> {
    return this.queryBus.execute(new GetExpensesQuery());
  }

  @Get(':id')
  @ApiOperation({
    summary: `Show Expense.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: QueryExpenseResponse,
    description: 'Expense found.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param() params: FindOneExpenseDto,
  ): Promise<QueryExpenseResponse> {
    return this.queryBus.execute(new GetExpenseQuery(params.id));
  }

  @Put(':id')
  @ApiOperation({
    summary: `Update Expense.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: UpdateExpenseResponse,
    description: 'Expense updated.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<UpdateExpenseResponse> {
    return this.commandBus.execute(
      new UpdateExpenseCommand(
        id,
        updateExpenseDto.title,
        updateExpenseDto.from,
        updateExpenseDto.description,
        updateExpenseDto.value,
        updateExpenseDto.paidAt,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: `Delete Expense.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 204, description: 'No content.' })
  async remove(@Param() params: DeleteExpenseDto): Promise<void> {
    return this.commandBus.execute(new DeleteExpenseCommand(params.id));
  }
}
