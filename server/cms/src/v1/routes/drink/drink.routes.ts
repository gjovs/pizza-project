import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function drinkRoutes(server: FastifyInstance) {
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

  // TODO index, show, delete, activate, update
    server.get("/", )
  
}
