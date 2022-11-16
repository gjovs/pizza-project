import { FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";

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
        payload: [`Hello ${name} `],
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const { code, message, path } = err.issues[0];

        return rep.status(400).send({
          code: 400,
          error: true,
          payload: [{ code, message, path }],
        });
      }

      return rep.status(400).send({
        code: 400,
        error: true,
        message: JSON.parse(err as string)[0],
      });
    }
  }
}

export default new HomeController();
