import { db } from "../configs/database";
import { pizza_stuffing, stuffing } from "@prisma/client";

class PizzaRecheio {
  /*STUFFINGS*/
  async save(data: stuffing) {
    const response = await db.stuffing.create({
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async index() {
    const response = await db.stuffing.findMany();

    return response;
  }

  async update(data: stuffing, id: number) {
    const response = await db.stuffing.update({
      where: {
        id,
      },
      data: {
        name: data.name,
      },
    });

    return response;
  }

  async delete(id: number) {
    const response = await db.stuffing.delete({
      where: {
        id,
      },
    });

    return response;
  }

  async savePizzaWithStuffing(data: pizza_stuffing) {
    const response = await db.pizza_stuffing.create({
      data: {
        pizza_id: data.pizza_id,
        stuffing_id: data.stuffing_id,
      },
    });

    return response;
  }
}

export default new PizzaRecheio();
