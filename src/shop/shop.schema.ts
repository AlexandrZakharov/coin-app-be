import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Ingredient extends Document {
  @Prop({ isRequired: true, unique: true })
  name: string;

  @Prop({ isRequired: true, unique: true })
  slug: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop({ isRequired: true })
  stock: number;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);

@Schema()
export class Category extends Document {
  @Prop({ isRequired: true, unique: true })
  name: string;

  @Prop({ isRequired: true, unique: true })
  slug: string;

  @Prop({ type: [IngredientSchema], default: [] })
  items: Types.Array<Ingredient>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

@Schema()
export class Shop extends Document {
  @Prop({ type: [CategorySchema], default: [] })
  categories: Types.Array<Category>;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
