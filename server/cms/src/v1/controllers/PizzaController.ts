import { picture, product } from "@prisma/client";
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

    const userData = req.user.payload;

    const userId = userData.id;

    // @ts-ignore
    const { picture, stuffing, price, saleOffValue, type } = body;

    await picture.toBuffer(); // buffer of the file

    const url = await FirebaseService.uploadImage(picture);

    // saving picture link in the db
    const pictureId = await Picture.save({ id: -1, picture_link: url });

    const stuffinInDb = await PizzaRecheio.showByName(stuffing.value as string);
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

    const productId = await Product.save({
      id: -1,
      created_by: userId,
      likes: 0,
      name,
      price: price.value,
    });

    // save picture in product
    await Picture.addPictureInProduct({
      id: -1,
      picture_id: pictureId,
      product_id: productId,
    });

    // save the sale off if exists
    if (saleOffValue.value > 0) {
      await Promocao.saveSaleOffProduct({
        id: -1,
        off_value: saleOffValue.value,
        product_id: productId,
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

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
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

  async show(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const pizza = await Pizza.show(parseInt(id));

    if (!pizza) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content no founded - 404"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: pizza,
    });
  }

  async update(req: FastifyRequest, rep: FastifyReply) {
    // TODO finish this function!
    const { body } = req;

    const { id } = req.params;

    const pizza = await Pizza.show(id);

    const picture_id = pizza?.product?.tbl_product_pictures[0].picture_id;

    const { product_id } = pizza;

    // @ts-ignore
    const { picture, stuffing, type, price, saleOffValue } = body;

    await picture.toBuffer(); // buffer of the file

    const newUrl = await FirebaseService.uploadImage(picture);

    // saving picture link in the db
    const pictureId = await Picture.update({ id: -1, picture_link: newUrl });

    const stuffingInDb = await PizzaRecheio.showByName(
      stuffing.value as string
    );
    const pizzaTypeId = await Pizza.getPizzaTypeByName(type.value as string);

    if (!stuffingInDb) {
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

    await Product.update({
      id: product_id,
      created_by: pizza?.product?.created_by as number,
      likes: pizza?.product?.likes as number,
      price: price.value,
      name,
    });

    // save the sale off if exists
    if (saleOffValue.value > 0) {
      await Promocao.updateSaleOffVaue({
        id: -1,
        off_value: saleOffValue.value,
        product_id: product_id,
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

    return rep.send({
      code: 200,
      error: false,
      payload: response,
    });
  }
}

export default new PizzaController();
