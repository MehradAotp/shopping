import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './database/model';
import * as bcrypt from 'bcrypt';
import { createUserInputDto } from './dto/create-user-input.dto';
import { createUserOutputDto } from './dto/create-user-output.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(user: createUserInputDto): Promise<createUserOutputDto> {
    const existingUser = await this.userModel.findOne({
      username: user.username,
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const result = savedUser.toObject();

    return {
      id: result._id.toString(),
      username: result.username,
    };
  }
  async findOne(username: string) {
    return this.userModel.findOne({ username });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }
}
