import { FastifyInstance } from "fastify";
import prisma from "../../configs/database";
import upload from "../../configs/multer";
import IUserRequest from "../../interfaces/user.interface";
import uploadProfilePicture from "../../middleware/upload/uploadProfilePicture";
import { getUserOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // @ts-ignore
  server.post(
    "/",
    {
      onRequest: [upload.single("avatar")],
      schema: getUserOptions,
      // @ts-ignore
      preHandler: uploadProfilePicture,
    },
    async (req: IUserRequest, rep) => {
      const { path, body } = req;

      console.log(body);

      rep.send([
        {
          profilePicture: req.path,
        },
      ]);
    }
  );
}
