import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ingredient } from "./shop/shop.schema";
import { Burger } from "./burger/burger.schema";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Burger.name) private burgerModel: Model<Burger>,
  ) {}

  getHello(): string {
    return "Hello World!";
  }

  async onModuleInit(): Promise<void> {
    await this.createIngredients();
    await this.createBurgers();
  }

  async createIngredients(): Promise<void> {
    const ingredients = [
      { name: "Top Bun", slug: "top_bun", price: 1 },
      { name: "Tomato", slug: "tomato", price: 0.5 },
      { name: "Beef", slug: "beef", price: 2 },
      { name: "Cheese", slug: "cheese", price: 2 },
      { name: "Bottom Bun", slug: "bottom_bun", price: 1 },
    ];

    for (const ingredient of ingredients) {
      const existingIngredient = await this.ingredientModel
        .findOne({ slug: ingredient.slug })
        .exec();

      if (!existingIngredient) {
        const newIngredient = new this.ingredientModel(ingredient);
        await newIngredient.save();
      }
    }
  }

  async createBurgers(): Promise<void> {
    const bigMacIngredients = [
      "top_bun",
      "beef",
      "cheese",
      "tomato",
      "beef",
      "cheese",
      "bottom_bun",
    ];
    const cheeseburgerIngredients = [
      "top_bun",
      "tomato",
      "beef",
      "cheese",
      "bottom_bun",
    ];

    const burgers = [
      {
        name: "Big Mac",
        slug: "big_mac",
        price: 10,
        ingredients: bigMacIngredients,
      },
      {
        name: "Cheeseburger",
        slug: "cheeseburger",
        price: 6,
        ingredients: cheeseburgerIngredients,
      },
    ];

    for (const burger of burgers) {
      const existingBurger = await this.burgerModel
        .findOne({ slug: burger.slug })
        .exec();

      if (!existingBurger) {
        const newBurger = new this.burgerModel(burger);
        await newBurger.save();
      }
    }
  }
}
