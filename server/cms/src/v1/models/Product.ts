import { db } from "../configs/database";

import {
  product,
} from "@prisma/client";

export class Product {
  async save(data: product): Promise<number> {
    const { id } = await db.product.create({
      data: {
        name: data.name,
        price: data.price,
        created_by: data.created_by,
      },
    });
    return id;
  }

  async index(): Promise<product[]> {
    const response = await db.product.findMany();

    return response;
  }
  async show(id: number): Promise<product | null> {
    const response = await db.product.findUnique({
      where: {
        id,
      },
    });

    return response;
  }

  async update(data: product, id: number) {
    const response = await db.product.update({
      where: {
        id,
      },

      data: {
        name: data.name,
        price: data.price
      }
    });

    return response
  }

  async delete(id: number): Promise<boolean> {
    const response = db.product.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }
}
