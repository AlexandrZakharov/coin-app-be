import { Module } from '@nestjs/common';
import { BurgerService } from './burger.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Burger, BurgerSchema } from './burger.schema';

@Module({
  providers: [BurgerService],
  imports: [
    MongooseModule.forFeature([{ name: Burger.name, schema: BurgerSchema }]),
  ],
  exports: [BurgerService],
})
export class BurgerModule {}
