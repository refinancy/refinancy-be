// import { Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// import { Model, ObjectId } from 'mongoose';
// import { User } from './interfaces/user.interface';
// // import { CreateUserCommand } from './commands/impl/create-user.command';

// @Injectable()
// export class UsersService {
//   constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}
//   async create(createUserDto: CreateUserDto): Promise<User> {
//     // return this.commandBus.execute(
//     //   new CreateUserCommand(email, firstName, lastName, password, username),
//     // );
//     const createdUser = await this.userModel.create(createUserDto);
//     console.log('createdUser', createdUser);
//     return createdUser.save();
//   }

//   async findAll(): Promise<User[]> {
//     return await this.userModel.find().exec();
//   }

//   async findOne(id: ObjectId) {
//     return await this.userModel.findById({ _id: id }).exec();
//   }

//   async update(id: ObjectId, updateUserDto: UpdateUserDto) {
//     return await this.userModel.updateOne(id, updateUserDto).exec();
//   }

//   async remove(id: ObjectId) {
//     return await this.userModel.deleteOne({ _id: id }).exec();
//   }
// }
