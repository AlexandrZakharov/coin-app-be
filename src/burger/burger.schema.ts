import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Burger extends Document {
  @Prop({ isRequired: true, unique: true })
  name: string;

  @Prop({ isRequired: true, unique: true })
  slug: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ type: [String], default: [] })
  ingredients: string[];
}

export const BurgerSchema = SchemaFactory.createForClass(Burger);
