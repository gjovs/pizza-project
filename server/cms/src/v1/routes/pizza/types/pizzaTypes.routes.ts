import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import PizzaTypesController from "../../../controllers/PizzaTypesController";
import {
  createPizzaTypeOptions,
  updatePizzaTypeOptions,
} from "./schema.pizzaTypes";

export default async function pizzaTypesRoutes(server: FastifyInstance) {
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
  server.post(
    "/",
    {
      onRequest: [server.authenticate],
      schema: createPizzaTypeOptions,
    },
    PizzaTypesController.save
  );
  server.get(
    "/",
    { onRequest: [server.authenticate] },
    PizzaTypesController.index
  );

  server.delete(
    "/:id",
    { onRequest: [server.authenticate] },
    PizzaTypesController.delete
  );

  server.put(
    "/activate/:id",
    {
      onRequest: [server.authenticate],
    },
    PizzaTypesController.activate
  );

  server.put(
    "/:id",
    {
      onRequest: [server.authenticate],
      schema: updatePizzaTypeOptions,
    },
    PizzaTypesController.update
  );
}
