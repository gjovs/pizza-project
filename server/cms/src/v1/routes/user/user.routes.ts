import { FastifyInstance } from "fastify";
import { UserController } from "../../controllers/";
import { createUserOptions, loginOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // Create User
  server.post("/register", { schema: createUserOptions }, UserController.save);
  server.post("/auth", { schema loginOptions }, UserController.auth)
}
