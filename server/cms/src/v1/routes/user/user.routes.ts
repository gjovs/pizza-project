import { FastifyInstance } from "fastify";
import { UserController } from "../../controllers/";
import { createUserOptions } from "./user.schema";

export default async function userRoutes(server: FastifyInstance) {
  // Create User
  server.post("/", { schema: createUserOptions }, UserController.save);
}
