import { product } from "@prisma/client";
import { FastifyRequest, FastifyReply } from "fastify";
import Picture from "../models/Picture";

import Pizza from "../models/Pizza";
import PizzaRecheio from "../models/PizzaRecheio";
import Product from "../models/Product";
import Promocao from "../models/Promocao";
import { FirebaseService } from "../services";

class PizzaController {
  async count(req: FastifyRequest, rep: FastifyReply) {
    const count = await Pizza.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }

  async save(req: FastifyRequest, rep: FastifyReply) {
    const { body } = req;

    const userId = req.user.payload.id;

    const { picture, stuffing, price, saleOffValue, type } = body;

    await picture.toBuffer();

    const url = await FirebaseService.uploadImage(picture);

    const pictureId = await Picture.save({
      id: -1,
      picture_link: url,
    });

    const stuffinInDb = await PizzaRecheio.showByName(stuffing.value);
    const pizzaTypeId = await Pizza.getPizzaTypeByName(type.value as string);

    if (!stuffinInDb) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "Recheio nao encontrado! ",
      });
    }

     if (!pizzaTypeId) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: "Tipo de Pizza nao encontrado! ",
      });
    }

    const name = stuffing.value + " " + type.value;

    const dataProduct = {
      created_by: userId,
      likes: 0,
      name,
      price: price.value,
    } as product;

    const productId = await Product.save(dataProduct);

    // save picture in product
    await Picture.addPictureInProduct({
      picture_id: pictureId,
      product_id: productId,
      id: -1,
    });

    // save the sale off if exists
    if (saleOffValue.value > 0) {
      await Promocao.saveSaleOffProduct({
        off_value: saleOffValue.value,
        product_id: productId,
        id: -1,
      });
    }

    // Create Pizza
    const pizza = await Pizza.save({
      id: -1,
      product_id: productId,
      pizza_type_id: pizzaTypeId,
    });

    const stuffingId = stuffinInDb.id;

    // add stuffing in pizza
    await PizzaRecheio.savePizzaWithStuffing({
      id: -1,
      pizza_id: pizza.id,
      stuffing_id: stuffingId,
    });

    const response = await Pizza.show(pizza.id);

    return response;
  }

  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Pizza.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }

  async delete(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const res = await Pizza.delete(parseInt(id));

    if (!res) {
      return rep.status(404).send({
        error: true,
        code: 404,
        message: ["Content Not Founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted"],
    });
  }
}

export default new PizzaController();
