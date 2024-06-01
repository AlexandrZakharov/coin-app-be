import { ConflictException, Injectable } from '@nestjs/common';
import { CheckCombinationDto } from './dto/check-combination.dto';
import { UserService } from '../user/user.service';
import { BurgerService } from '../burger/burger.service';
import { User } from '../user/user.schema';

@Injectable()
export class GameService {
  constructor(
    private readonly userService: UserService,
    private readonly burgerService: BurgerService,
  ) {}

  async checkCombination(
    dto: CheckCombinationDto,
  ): Promise<{ isCorrect: boolean; user: User }> {
    const user = await this.userService.findUserByTgId(dto.tgId);
    const burger = await this.burgerService.findBySlug(user.order);
    const isCorrect = this.isEqual(dto.combination, burger.ingredients);
    const newUserData = await this.calculateNewUserData(
      isCorrect,
      burger.price,
      user,
      dto.combination,
    );
    const updatedUser = await this.userService.updateUserByTgId(
      dto.tgId,
      newUserData,
    );

    return {
      isCorrect,
      user: updatedUser,
    };
  }

  async calculateNewUserData(
    isEqual: boolean,
    burgerPrice: number,
    user: User,
    combination: string[],
  ): Promise<Partial<User>> {
    const balance = isEqual ? user.balance + burgerPrice : user.balance - 10;
    const burgersMade = (user.burgersMade += 1);
    const order = await this.burgerService.getRandomBurgerSlug();
    const ingredients = new Map();

    combination.forEach((ingredient) => {
      if (user.ingredients.get(ingredient) > 0) {
        ingredients.set(ingredient, user.ingredients.get(ingredient) - 1);
      } else {
        throw new ConflictException(`Insufficient ${ingredient} stock`);
      }
    });

    return {
      balance,
      burgersMade,
      order,
      ingredients,
    };
  }

  private isEqual(userCombination: string[], recipe: string[]): boolean {
    for (let i = 0; i < recipe.length; i++) {
      if (recipe[i] !== userCombination[i]) {
        return false;
      }
    }

    return true;
  }
}
