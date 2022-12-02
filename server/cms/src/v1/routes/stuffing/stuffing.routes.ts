import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

import StuffingController from "../../controllers/StuffingController";

export default async function stuffingRoutes(server: FastifyInstance) {
  server.post("/", StuffingController.save)
  server.get("/", StuffingController.index);
  server.get("/:id", StuffingController.show);

  server.delete("/:id", StuffingController.delete);

  server.put("/activate/:id", StuffingController.activate);

  server.put("/:id", StuffingController.update);
}
