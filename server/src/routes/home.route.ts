import { FastifyInstance } from "fastify";
import { HomeController } from "../controllers";
import { TypeReplyGeneric } from "../interfaces";

export default async function homeRoutes(server: FastifyInstance) {
  server.get(
    "/greeting",
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            }
          }
        },
        response: TypeReplyGeneric,
      },
    },
    HomeController.index
  );
}
