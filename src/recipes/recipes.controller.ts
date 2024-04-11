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
import { CreateRecipeResponse } from './responses/create-recipe.response';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { QueryRecipeResponse } from './responses/query-recipe.response';
import { FindOneRecipeDto } from './dto/find-one-recipe.dto';
import { UpdateRecipeResponse } from './responses/update-recipe.response';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { DeleteRecipeDto } from './dto/delete-recipe.dto';
import { CreateRecipeCommand } from './commands/impl/create-recipe.command';

import { UpdateRecipeCommand } from './commands/impl/update-recipe.command';
import { DeleteRecipeCommand } from './commands/impl/delete-recipe.command';
import { GetRecipesQuery } from './queries/impl/get-recipes.queries';
import { GetRecipeQuery } from './queries/impl/get-recipe.queries';

@ApiTags(tags.recipes.name)
@Controller('recipes')
export class RecipesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: `Create Recipe.`,
  })
  @ApiResponse({
    status: 201,
    type: CreateRecipeResponse,
    description: 'The recipe has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<CreateRecipeResponse> {
    return this.commandBus.execute(
      new CreateRecipeCommand(
        createRecipeDto.title,
        createRecipeDto.from,
        createRecipeDto.description,
        createRecipeDto.value,
        createRecipeDto.receivedAt,
      ),
    );
  }

  @Get()
  @ApiOperation({
    summary: `List Recipe.`,
  })
  @ApiResponse({
    status: 200,
    type: QueryRecipeResponse,
    description: 'List of recipes.',
  })
  async findAll(): Promise<QueryRecipeResponse[]> {
    return this.queryBus.execute(new GetRecipesQuery());
  }

  @Get(':id')
  @ApiOperation({
    summary: `Show Recipe.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: QueryRecipeResponse,
    description: 'Recipe found.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(
    @Param() params: FindOneRecipeDto,
  ): Promise<QueryRecipeResponse> {
    return this.queryBus.execute(new GetRecipeQuery(params.id));
  }

  @Put(':id')
  @ApiOperation({
    summary: `Update Recipe.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: UpdateRecipeResponse,
    description: 'Recipe updated.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<UpdateRecipeResponse> {
    return this.commandBus.execute(
      new UpdateRecipeCommand(
        id,
        updateRecipeDto.title,
        updateRecipeDto.from,
        updateRecipeDto.description,
        updateRecipeDto.value,
        updateRecipeDto.receivedAt,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: `Delete Recipe.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 204, description: 'No content.' })
  async remove(@Param() params: DeleteRecipeDto): Promise<void> {
    return this.commandBus.execute(new DeleteRecipeCommand(params.id));
  }
}
