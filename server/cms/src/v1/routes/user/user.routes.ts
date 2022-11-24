import { FastifyInstance } from "fastify";
import { IUser } from "../../models/User";
import { FirebaseService } from "../../services";
import { getUserOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // @ts-ignore
  server.post(
    "/",
    {
      schema: getUserOptions,
    },
    async (req, rep) => {
      const { body } = req;

      // @ts-ignore
      const { profile_picture, name, email } = body;

      await profile_picture.toBuffer();

      const url = await FirebaseService.uploadImage(profile_picture);

      rep.send([
        {
          profilePicture: url,
        },
      ]);
    }
  );
}
