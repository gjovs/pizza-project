import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

class HomeController {
  async index(req: FastifyRequest, rep: FastifyReply) {
    const createQueryParams = z.object({
      name: z.string().min(1),
    });

    try {
      const { name } = createQueryParams.parse(req.query);

      return rep.status(200).send({
        code: 200,
        error: false,
        payload: [`Hello ${name}`],
      });
    } catch ({ message }) {
      const error = JSON.parse(message as string)[0].message;
      return rep.status(400).send({
        code: 400,
        error: true,
        payload: error,
      });
    }
  }
}

export default new HomeController();
