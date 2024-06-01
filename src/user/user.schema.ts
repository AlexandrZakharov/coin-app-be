import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as process from 'process';

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  tgId: number;

  @Prop({ isRequired: true })
  username: string;

  @Prop({ default: 100 })
  balance: number;

  @Prop({ default: 0 })
  burgersMade: number;

  @Prop({ type: Map, of: Number })
  ingredients: Map<string, number>;

  @Prop({ default: process.env.DEFAULT_AVATAR })
  photoUrl: string;

  @Prop({ default: 'big_mac' })
  order: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
