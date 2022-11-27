import { pizza_ingredient, tbl_ingredient } from "@prisma/client";
import { db } from "../configs/database";

class Ingredient {
  async save(data: tbl_ingredient) {
    const response = await db.tbl_ingredient.create({
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.tbl_ingredient.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async update(data: tbl_ingredient) {
    const response = await db.tbl_ingredient.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async delete(data: tbl_ingredient) {
    const response = await db.tbl_ingredient.delete({
      where: {
        id: data.id,
      },
    });

    return response;
  }

  async getByName(name: string) {
    const response = await db.tbl_ingredient.findMany({
      where: {
        name: name,
      },
    });

    return response;
  }

  async addIngredientInPizza(data: pizza_ingredient) {
    const response = await db.pizza_ingredient.create({
      data: {
        ingredient_id: data.ingredient_id,
        pizza_id: data.pizza_id,
      },
    });

    return response;
  }

  async deleteIngredientInPizza(data: pizza_ingredient) {
    const response = await db.pizza_ingredient.delete({
      where: {
        id: data.id,
      },
    });

    return response;
  }
}
