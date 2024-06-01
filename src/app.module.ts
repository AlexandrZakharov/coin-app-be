import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { GameModule } from './game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './shop/shop.schema';
import { Burger, BurgerSchema } from './burger/burger.schema';
import { BurgerModule } from './burger/burger.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Ingredient.name,
        schema: IngredientSchema,
      },
      {
        name: Burger.name,
        schema: BurgerSchema,
      },
    ]),
    UserModule,
    ShopModule,
    GameModule,
    BurgerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
