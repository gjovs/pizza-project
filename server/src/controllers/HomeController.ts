import { FastifyReply, FastifyRequest } from "fastify";
import zod from "zod";

class HomeController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        name: string;
      };
    }>,
    rep: FastifyReply<{
      message: string;
    }>
  ) {
    const { name } = req.query;

    return rep.status(200).send({
      message: `Hello ${name}`,
    });
  }
}

export default new HomeController();
