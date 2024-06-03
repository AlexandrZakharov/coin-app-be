import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ingredient } from "./shop/shop.schema";
import { Burger } from "./burger/burger.schema";

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Burger.name) private burgerModel: Model<Burger>
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
      { name: "Salad", slug: "salad", price: 1 },
      { name: "Sauce", slug: "sauce", price: 1 }
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
      "bottom_bun",
      "cheese",
      "salad",
      "sauce",
      "tomato",
      "beef",
      "top_bun"
    ];
    const cheeseburgerIngredients = [
      "bottom_bun",
      "sauce",
      "tomato",
      "salad",
      "beef",
      "cheese",
      "top_bun"
    ];
    const bigTastyIngredients = [
      "bottom_bun",
      "tomato",
      "beef",
      "salad",
      "sauce",
      "cheese",
      "top_bun"
    ];
    const mcCrispyIngredients = [
      "bottom_bun",
      "sauce",
      "tomato",
      "cheese",
      "beef",
      "salad",
      "top_bun"
    ];
    const mcRoyalIngredients = [
      "bottom_bun",
      "salad",
      "beef",
      "sauce",
      "cheese",
      "tomato",
      "top_bun"
    ];

    const burgers = [
      {
        name: "Big Mac",
        slug: "big_mac",
        price: 12,
        ingredients: bigMacIngredients
      },
      {
        name: "Cheeseburger",
        slug: "cheeseburger",
        price: 6,
        ingredients: cheeseburgerIngredients
      },
      {
        name: "Big Tasty",
        slug: "big_tasty",
        price: 9,
        ingredients: bigTastyIngredients
      },
      {
        name: "McCrispy",
        slug: "mc_crispy",
        price: 7,
        ingredients: mcCrispyIngredients
      },
      {
        name: "McRoyal",
        slug: "mc_royal",
        price: 8,
        ingredients: mcRoyalIngredients
      }
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
