import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({
    default:
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1788614524.1717113600&semt=ais_user',
  })
  photoUrl: string;

  @Prop({ default: 'big_mac' })
  order: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
