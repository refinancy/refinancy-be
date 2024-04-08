import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUsersQuery } from './queries/impl/get-users.queries';
import { GetUserQuery } from './queries/impl/get-user.queries';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { DeleteUserCommand } from './commands/impl/delete-user.command';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserCommand } from './commands/impl/update-user.command';

@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
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
  async findAll(): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async findOne(@Param() params: FindOneUserDto) {
    return this.queryBus.execute(new GetUserQuery(params.id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
  async remove(@Param() params: DeleteUserDto) {
    return this.commandBus.execute(new DeleteUserCommand(params.id));
  }
}
