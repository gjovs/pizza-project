import { sale_off_products } from "@prisma/client";
import { db } from "../configs/database";
class Promocao {
  async index() {
    const response = await db.sale_off_products.findMany();

    return response;
  }

  async save(data: sale_off_products) {
    const response = await db.sale_off_products.create({
      data: {
        product_id: data.product_id,
        off_value: data.off_value,
      },
    });

    return response;
  }

  async update(data: sale_off_products, id: number) {

    const response = await db.sale_off_products.update({
      where: {
        id,
      },
      data: {
        off_value: data.off_value,
      },
    });

    return response;
  }

  async delete(id: number) {
    const response = await db.sale_off_products.delete({
      where: {
        id,
      },
    });

    if (!response) return false;
    return true;
  }

  async saveSaleOffProduct(data: sale_off_products) {
    const response = await db.sale_off_products.create({
      data: {
        product_id: data.product_id,
        off_value: data.off_value,
      },
    });

    return response;
  }

  async getSaleOffPizzas() {
    const response = await db.sale_off_products.findMany({
      include: {
        product: {
          select: {
            pizza: true,
          },
        },
      },
    });

    return response;
  }

  async getSaleOfDrinks() {
    const response = await db.sale_off_products.findMany({
      include: {
        product: {
          select: {
            drink: true,
          },
        },
      },
    });

    return response;
  }
}

export default new Promocao();
