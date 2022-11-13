import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { IReplyGeneric } from "../interfaces";

class HomeController {
  async index(
    req: FastifyRequest<{
      Querystring: {
        name: string;
      };
    }>,
    rep: FastifyReply<IReplyGeneric>
  ) {
    const createQueryParams = z.object({
      name: z.string().min(1),
    });

    console.log(req.query);

    try {
      const { name } = createQueryParams.parse(req.query);

      return rep.status(200).send({
        code: 200,
        error: false,
        message: [`Hello ${name}`],
      });
    } catch ({ message }) {
      const error = JSON.parse((message as string))[0].message;
      return rep.status(400).send({
        code: 400,
        error: true,
        message: error,
      });
    }
  }
}

export default new HomeController();
