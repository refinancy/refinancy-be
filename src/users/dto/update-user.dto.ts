import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import * as mongoose from 'mongoose';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  _id: mongoose.ObjectId;
}
