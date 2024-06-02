import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findOrCreateUser({ tgId, username }: CreateUserDto): Promise<User> {
    try {
      return await this.findUserByTgId(tgId);
    } catch (error) {
      const ingredients = {
        top_bun: 100,
        tomato: 100,
        beef: 100,
        cheese: 100,
        bottom_bun: 100,
        sauce: 100,
        salad: 100,
      };

      const user = new this.userModel({ tgId, username, ingredients });
      await user.save();

      return user;
    }
  }

  async findUserByTgId(tgId: number): Promise<User> {
    const user = await this.userModel.findOne({ tgId }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserByTgId(tgId: number, dto: Partial<User>): Promise<User> {
    const user = await this.findUserByTgId(tgId);

    if (dto.username) {
      user.username = dto.username;
    }
    if (dto.balance !== undefined) {
      user.balance = dto.balance;
    }
    if (dto.burgersMade !== undefined) {
      user.burgersMade = dto.burgersMade;
    }
    if (dto.ingredients) {
      user.ingredients = dto.ingredients;
    }
    if (dto.order) {
      user.order = dto.order;
    }

    return user.save();
  }
}
