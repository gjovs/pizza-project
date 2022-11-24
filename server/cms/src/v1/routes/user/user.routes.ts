import { FastifyInstance } from "fastify";
import User from "../../models/User";
import { FirebaseService } from "../../services";
import { createUserOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      schema: createUserOptions,
    },
    async (req, rep) => {
      const { body } = req;

      // @ts-ignore
      const { profile_picture, name, email, password, cellphone, phone } = body;

      await profile_picture.toBuffer();

      const url = await FirebaseService.uploadImage(profile_picture);

      const user = await User.save({
        id: -1,
        profile_picture: url,
        name,
        email,
        password,
        cellphone,
        phone,
        isAdmin: false,
      });

      return rep.send({
        statusCode: 200,
        error: false,
        payload: [user],
      });
    }
  );
}
