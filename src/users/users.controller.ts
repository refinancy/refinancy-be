import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import * as mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const objectId = new mongoose.Schema.ObjectId(id);
    return this.usersService.findOne(objectId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update({
  //     _id: mongoose.Types.ObjectId(id),
  //     updateUserDto,
  //   });
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const objectId = new mongoose.Schema.ObjectId(id);
    return this.usersService.remove(objectId);
  }
}
