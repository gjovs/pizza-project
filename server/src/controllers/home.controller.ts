import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from "fastify";
import { z, ZodError } from "zod";
import IMulterRequest from "../interface/multer.interface";
import { FirebaseService } from "../services";

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
<<<<<<< HEAD
          payload: err.issues,
=======
          payload: [{ code, message, path }],
>>>>>>> f9d1be96f92f8ef296e37be1ccd9af98502c9ed9
        });
      }

      return rep.status(400).send({
        code: 400,
        error: true,
        message: JSON.parse(err as string)[0],
      });
    }
  }

  async uploadPicture(req: FastifyRequest, rep: FastifyReply) {
    if (!(req as IMulterRequest).file) {
      return rep.status(400).send({
        code: 400,
        error: true,
        message: ["Required Field *avatar picture*"],
      });
    }

    const image = (req as IMulterRequest).file;

    await FirebaseService.uploadImage(image);
    

    return {  };
  }
}

export default new HomeController();
