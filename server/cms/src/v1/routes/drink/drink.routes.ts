import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import DrinkController from "../../controllers/DrinkController";
import { createDrinkOptions } from "./drink.schema";

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
  server.get("/", { onRequest: [server.authenticate] }, DrinkController.index);
  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createDrinkOptions },
    DrinkController.save
  );

  server.get(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkController.show
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    DrinkController.delete
  );
  server.put(
    "/activate/:id",
    { onRequest: [server.authenticate] },
    DrinkController.activate
  );
}
