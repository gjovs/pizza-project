import { FastifyInstance } from "fastify";

export default async function pictureRoutes(server: FastifyInstance) {
  server.post("", { onRequest: [] }, (req, rep) => {
    
  });
}
