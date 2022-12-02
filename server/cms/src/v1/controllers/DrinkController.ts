import { FastifyRequest, FastifyReply } from "fastify";
import Bebida from "../models/Bebida";

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

  async delete(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params;
  }
  async update(req: FastifyRequest, rep: FastifyReply) {}
  async activate(req: FastifyRequest, rep: FastifyReply) {}
}

export default new DrinkController();
