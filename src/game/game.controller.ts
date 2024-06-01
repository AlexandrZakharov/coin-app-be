import { Body, Controller, Post } from '@nestjs/common';
import { CheckCombinationDto } from './dto/check-combination.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(
    private readonly gameService: GameService
  ) {}

  @Post('/check')
  async checkCombination(@Body() dto: CheckCombinationDto) {
    try {
      return await this.gameService.checkCombination(dto);
    } catch (error) {
      throw new Error(error);
    }
  }
}
