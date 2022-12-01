import { FastifyRequest, FastifyReply } from "fastify";
import Bebida from "../models/Bebida";
import Picture from "../models/Picture";
import Product from "../models/Product";
import Promocao from "../models/Promocao";
import { FirebaseService } from "../services";

class DrinkController {
  // TODO finishing this controller and the drink type controller!
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
      volume: volume.value,
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
}

export default new DrinkController();
