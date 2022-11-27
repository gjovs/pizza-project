import { drink, drink_type } from "@prisma/client";
import { db } from "../configs/database";

class Bebida {
  async save(data: drink) {
    const response = await db.drink.create({
      data: {
        volume: data.volume,
        product_id: data.product_id,
        drink_type_id: data.drink_type_id,
      },
    });

    return response;
  }

  async index() {
    const response = await db.drink.findMany({
      include: {
        drink_type: {
          select: {
            name: true,
          },
        },
      },
    });

    return response;
  }

  async show(id: number) {
    const response = await db.drink.findUnique({
      where: {
        id,
      },
    });
    return response;
  }

  async delete(id: number) {
    const response = await db.drink.delete({
      where: { id },
    });

    return response;
  }

  /*TYPES*/
  async saveBebidaTypes(data: drink_type) {
    const response = await db.drink_type.create({
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async getBebidaTypes() {
    const response = await db.drink_type.findMany();

    return response;
  }

  async updateBebidaTypes(data: drink_type, id: number) {
    const response = await db.drink_type.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async deleteBebidaTypes(id: number) {
    const response = await db.drink_type.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }
}
