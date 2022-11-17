import { FastifyInstance } from "fastify";
import { HomeController } from "../controllers";
import { TypeReplyGeneric } from "../types";
import upload from "../configs/multer";

export default async function homeRoutes(server: FastifyInstance) {
  server.get(
    "/greeting",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
        response: TypeReplyGeneric,
      },
    },
    HomeController.index
  );
  server.post(
    "/photo",
    { preHandler: upload.single("avatar") },
    HomeController.uploadPicture
  );
}
