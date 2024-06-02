import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckCombinationDto } from './dto/check-combination.dto';
import { GameService } from './game.service';
import { BurgerService } from '../burger/burger.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly burgerService: BurgerService,
  ) {}

  @Post('/check')
  async checkCombination(@Body() dto: CheckCombinationDto) {
    try {
      return await this.gameService.checkCombination(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/burgers')
  async getAllBurgers() {
    try {
      return await this.burgerService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}
