import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import PizzaController from "../../controllers/PizzaController";
import { createPizzaOptions } from "./schema.pizza";

export default async function pizzaRoutes(server: FastifyInstance) {
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

  server.get("/count", {}, PizzaController.count);

  server.get("/", PizzaController.index);
  server.get("/:id", PizzaController.show);

  server.post(
    "/",
    { onRequest: [server.authenticate], schema: createPizzaOptions },
    PizzaController.save
  );

  server.put(
    "/:id",
    { onRequest: [server.authenticate] },
    PizzaController.update
  );
  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    PizzaController.delete
  );
}
