import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Burger } from './burger.schema';

@Injectable()
export class BurgerService {
  constructor(@InjectModel(Burger.name) private burgerModel: Model<Burger>) {}

  async findBySlug(slug: string): Promise<Burger> {
    const burger = await this.burgerModel.findOne({ slug }).exec();
    if (!burger) {
      throw new NotFoundException('Burger not found');
    }
    return burger;
  }

  async findAll(): Promise<Burger[]> {
    return await this.burgerModel.find().exec();
  }

  async getRandomBurgerSlug(): Promise<string> {
    const burgers = await this.findAll();
    if (!burgers.length) {
      throw new Error('No burgers found');
    }
    const randomIndex = Math.floor(Math.random() * burgers.length);
    return burgers[randomIndex].slug;
  }
}
