import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { UserModule } from '../user/user.module';
import { BurgerModule } from '../burger/burger.module';

@Module({
  imports: [UserModule, BurgerModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
