import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUsersQuery } from './queries/impl/get-users.queries';
import { GetUserQuery } from './queries/impl/get-user.queries';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from './commands/impl/update-user.command';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponse } from './responses/create-user.response';
import { tags } from 'src/swagger';
import { QueryUserResponse } from './responses/query-user.response';
import { UpdateUserResponse } from './responses/update-user.response';
@ApiTags(tags.users.name)
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    summary: `Create User.`,
  })
  @ApiResponse({
    status: 201,
    type: CreateUserResponse,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponse> {
    return this.commandBus.execute(
      new CreateUserCommand(
        createUserDto.firstName,
        createUserDto.lastName,
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }

  @Get()
  @ApiOperation({
    summary: `List User.`,
  })
  @ApiResponse({
    status: 200,
    type: QueryUserResponse,
    description: 'List of users.',
  })
  async findAll(): Promise<QueryUserResponse[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  @ApiOperation({
    summary: `Show User.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: QueryUserResponse,
    description: 'User found.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  async findOne(@Param() params: FindOneUserDto): Promise<QueryUserResponse> {
    return this.queryBus.execute(new GetUserQuery(params.id));
  }
  @Put(':id')
  @ApiOperation({
    summary: `Update User.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    type: UpdateUserResponse,
    description: 'User updated.',
  })
  @ApiResponse({ status: 404, description: 'Not found.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.commandBus.execute(
      new UpdateUserCommand(
        id,
        updateUserDto.firstName,
        updateUserDto.lastName,
        updateUserDto.username,
        updateUserDto.email,
        updateUserDto.password,
      ),
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: `Delete User.`,
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 404, description: 'Not found.' })
  @ApiResponse({ status: 204, description: 'No content.' })
  async remove(@Param() params: DeleteUserDto): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(params.id));
  }
}
