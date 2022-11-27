import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../../controllers/";
import User from "../../models/User";
import { createUserOptions, loginOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // JWT VALIDATION
  server.decorate(
    "authenticate",
    async (req: FastifyRequest, rep: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (error) {
        rep.send(error);
      }
    }
  );
  // Create User
  server.post(
    "/register",
    { schema: createUserOptions, onRequest: [server.authenticate] },
    UserController.save
  );

  // Login (generate the jwt)
  server.post(
    "/login",
    { schema: loginOptions },
    async (
      req: FastifyRequest<{
        Body: {
          email: string;
          password: string;
        };
      }>,
      rep
    ) => {
      const { email, password } = req.body;

      const user = await User.getUserByEmail(email);

      // check password is the same
      if (!(user[0].password === password)) {
        return rep.status(401).send({
          error: true,
          code: 401,
          message: ["Invalid Password! - Unauthorized"],
        });
      }

      const data = { payload: user[0] };

      const token = server.jwt.sign(data);

      return rep.send({
        code: 200,
        error: false,
        payload: { token },
      });
    }
  );
}
