import { FastifyRequest, FastifyReply } from "fastify";
import Bebida from "../models/Bebida";
import Picture from "../models/Picture";
import Product from "../models/Product";
import Promocao from "../models/Promocao";
import { FirebaseService } from "../services";

class DrinkController {
  async count(req: FastifyRequest, rep: FastifyReply) {
    const count = await Bebida.count();
    return rep.send({
      error: false,
      code: 200,
      count: count,
    });
  }
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Bebida.index();

    return rep.send({
      code: 200,
      error: false,
      payload: response,
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

    const response = await Bebida.show(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded!"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      payload: [response],
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

    const response = await Bebida.delete(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Succefull Deleted!"],
    });
  }
  async save(req: FastifyRequest, rep: FastifyReply) {
    // @ts-ignore
    const { picture, volume, type, saleOffValue, price, name } = req.body;

    // TODO

    const userData = req.user.payload;

    const userId = userData.id;

    await picture.toBuffer(); // buffer of the file

    const url = await FirebaseService.uploadImage(picture);

    // saving picture link in the db
    const pictureId = await Picture.save({ id: -1, picture_link: url });

    const drinkTypeInDb = await Bebida.getBebidaTypeByName(type.value);

    if (!drinkTypeInDb) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Tipo de bebida não encontrado!"],
      });
    }

    const productId = await Product.save({
      id: -1,
      created_by: userId,
      likes: 0,
      name: name.value,
      price: price.value,
      status: true,
    });

    // save picture in product
    await Picture.addPictureInProduct({
      id: -1,
      picture_id: pictureId,
      product_id: productId,
    });

    if (saleOffValue.value > 0) {
      await Promocao.saveSaleOffProduct({
        id: -1,
        off_value: saleOffValue.value,
        product_id: productId,
      });
    }

    const drink = await Bebida.save({
      id: -1,
      drink_type_id: drinkTypeInDb?.id as number,
      product_id: productId,
      volume: parseInt(volume.value),
    });

    return rep.send({
      code: 200,
      error: false,
      payload: [drink],
    });
  }
  async activate(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    const response = await Bebida.activate(parseInt(id));

    if (!response) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded"],
      });
    }

    return rep.send({
      code: 200,
      error: false,
      message: ["Activated sucefully!"],
    });
  }

  async update(
    req: FastifyRequest<{
      Params: {
        id: string;
      };
    }>,
    rep: FastifyReply
  ) {
    const { id } = req.params;

    // @ts-ignore
    const { picture, volume, type, saleOffValue, price, name } = req.body;

    const drink = await Bebida.show(parseInt(id));

    if (!drink) {
      return rep.status(404).send({
        code: 404,
        error: true,
        message: ["Content not founded!"],
      });
    }

    if (picture) {
      await picture.toBuffer(); // buffer of the file

      const url = await FirebaseService.uploadImage(picture);

      // saving picture link in the db
      const pictureId = drink?.product?.tbl_product_pictures[0].picture?.id;

      await Picture.update({ id: pictureId as number, picture_link: url });
    }

    if (type && volume) {
      const res = await Bebida.getBebidaTypeByName(type.value);
      if (!res) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: ["Tipo de bebida não encontrado!"],
        });
      }
      await Bebida.update({
        drink_type_id: res.id as number,
        id: parseInt(id),
        product_id: drink.product?.id as number,
        volume: parseInt(volume.value),
      });
    } else if (type) {
      const res = await Bebida.getBebidaTypeByName(type.value);
      if (!res) {
        return rep.status(404).send({
          code: 404,
          error: true,
          message: ["Tipo de bebida não encontrado!"],
        });
      }
      await Bebida.update({
        drink_type_id: res.id as number,
        id: parseInt(id),
        product_id: drink.product?.id as number,
        volume: drink.volume,
      });
    } else if (volume) {
      await Bebida.update({
        drink_type_id: drink?.drink_type?.id as number,
        id: parseInt(id),
        product_id: drink.product?.id as number,
        volume: parseInt(volume.value),
      });
    }

    if (saleOffValue) {
      if (drink?.product?.sale_off_products) {
        await Promocao.update({
          id: drink?.product?.sale_off_products[0].id as number,
          off_value: saleOffValue.value,
          product_id: drink?.product?.id as number,
        });
      } else {
        await Promocao.saveSaleOffProduct({
          id: -1,
          off_value: saleOffValue.value,
          product_id: drink.product?.id as number,
        });
      }
    }

    await Product.update({
      created_by: drink?.product?.created_by as number,
      id: drink?.product?.id as number,
      likes: drink?.product?.likes as number,
      name: name.value,
      price: price.value,
      status: true,
    });

    return rep.send({
      code: 200,
      error: false,
      message: ["Updated Sucefull"],
    });
  }
}

export default new DrinkController();
