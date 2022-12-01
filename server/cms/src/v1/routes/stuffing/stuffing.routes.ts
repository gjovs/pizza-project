import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import StuffingController from "../../controllers/StuffingController";

export default async function stuffingRoutes(server: FastifyInstance) {
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

  server.post("/", StuffingController.save)
  server.get("/", StuffingController.index);
  server.get("/:id", StuffingController.show);

  server.delete("/:id", StuffingController.delete);

  server.put("/activate/:id", StuffingController.activate);

  server.put("/:id", StuffingController.update);
}
