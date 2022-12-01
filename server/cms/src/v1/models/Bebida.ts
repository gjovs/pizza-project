import { drink, drink_type } from "@prisma/client";
import { db } from "../configs/database";
import Product from "./Product";

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
    const { product_id } = await db.drink.delete({
      where: { id },
    });

    await Product.delete(product_id as number);

    return true;
  }

  async update(data: drink) {
    const response = await db.drink.update({
      data: {
        drink_type_id: data.drink_type_id,
        volume: data.volume,
      },
      where: {
        id: data.id,
      },
    });

    return response;
  }

  /*TYPES*/
  async saveBebidaTypes(data: drink_type) {
    const response = await db.drink_type.create({
      data: {
        name: data.name,
        status: data.status,
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
    const response = await db.drink_type.update({
      where: {
        id,
      },
      data: {
        status: false,
      },
    });

    if (!response) return false;

    const allProducts = await db.drink_type.findMany({
      where: {
        id,
      },
      include: {
        drink: {
          include: {
            product: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const ids = allProducts[0].drink.map((item) => item.product_id);

    Promise.all(
      ids.map(async (id) => {
        await db.product.update({
          where: {
            id: id as number,
          },
          data: {
            status: false,
          },
        });
      })
    );

    return true;
  }
  async activateBebidaTypes(id: number) {
    const response = await db.drink_type.update({
      where: {
        id,
      },
      data: {
        status: true,
      },
    });

    if (!response) return false;

    const allProducts = await db.drink_type.findMany({
      where: {
        id,
      },
      include: {
        drink: {
          include: {
            product: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    const ids = allProducts[0].drink.map((item) => item.product_id);

    Promise.all(
      ids.map(async (id) => {
        await db.product.update({
          where: {
            id: id as number,
          },
          data: {
            status: true,
          },
        });
      })
    );

    return true;
  }
}

export default new Bebida();
