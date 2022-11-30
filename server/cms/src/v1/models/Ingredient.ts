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

    if (response.length <= 0) return false
    return response[0];
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

  async deleteIngredientInPizza(id: number) {
    const response = await db.pizza_ingredient.delete({
      where: {
        id,
      },
    });

    return response;
  }

  async updateIngrendientInPizza(data: pizza_ingredient) {
    const res = await db.pizza_ingredient.update({
      data: {
        ingredient_id: data.ingredient_id
      },
      where: {
        id: data.id,
      }
    })
  }
}




export default new Ingredient();
