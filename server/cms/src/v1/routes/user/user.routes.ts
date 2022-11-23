import { FastifyInstance } from "fastify";
import { FirebaseService } from "../../services";
import { getUserOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // @ts-ignore
  server.post(
    "/",
    {
      schema: getUserOptions,
    },
    async (req , rep) => {
      const { body } = req

      // @ts-ignore
      const { avatar } = body

      await avatar.toBuffer()      
      
      const url = await FirebaseService.uploadImage(avatar)

      rep.send([
        {
          profilePicture: url,
        },
      ]);
    }
  );
}
