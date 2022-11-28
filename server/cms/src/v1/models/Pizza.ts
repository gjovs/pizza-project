import { db } from "../configs/database";

import { pizza, pizza_type } from "@prisma/client";
import Product from "./Product";

class Pizza {
  async count() {
    const res = await db.pizza.count();
    return res;
  }
  async save(data: pizza) {
    const response = await db.pizza.create({
      data: {
        product_id: data.product_id,
        pizza_type_id: data.pizza_type_id,
      },
    });

    return response;
  }

  async index() {
    const response = await db.pizza.findMany({
      include: {
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture_id: true,
              },
            },
          },
        },
        pizza_ingredient: {
          select: {
            ingredient: true,
          },
        },
        pizza_stuffing: {
          select: {
            stuffing: true,
          },
        },
        pizza_type: {
          select: {
            name: true,
            dimensions: true,
          },
        },
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.pizza.findUnique({
      where: {
        id,
      },
      include: {
        product: {
          include: {
            tbl_product_pictures: {
              select: {
                picture_id: true,
              },
            },
          },
        },
        pizza_ingredient: {
          select: {
            ingredient: true,
          },
        },
        pizza_stuffing: {
          select: {
            stuffing: true,
          },
        },
        pizza_type: {
          select: {
            name: true,
            dimensions: true,
          },
        },
      },
    });
    return response;
  }

  async delete(id: number) {
    await db.pizza_stuffing.deleteMany({
      where: {
        pizza_id: id,
      },
    });

    await db.pizza_ingredient.deleteMany({
      where: {
        pizza_id: id,
      },
    });

    const { product_id } = await db.pizza.delete({
      where: { id },
    });

    await Product.delete(product_id as number);

    return true;
  }

  /*TYPES*/
  async savePizzaTypes(data: pizza_type) {
    const response = await db.pizza_type.create({
      data: {
        name: data.name,
        dimensions: data.dimensions,
      },
    });

    return response;
  }

  async getPizzaTypes() {
    const response = await db.pizza_type.findMany();

    return response;
  }

  async getPizzaTypeByName(name: string) {
    const response = await db.pizza_type.findMany({
      where: {
        name,
      },
    });

    if (response.length <= 0) return false;

    return response[0].id;
  }

  async updatePizzaTypes(data: pizza_type, id: number) {
    const response = await db.pizza_type.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        dimensions: data.dimensions,
      },
    });

    return response;
  }

  async deletePizzaTypes(id: number) {
    const response = await db.pizza_type.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }
}

export default new Pizza();
