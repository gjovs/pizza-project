import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import PizzaController from "../../controllers/PizzaController";

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

  server.post("/", { onRequest: [server.authenticate] }, PizzaController.save);

  server.delete("/:id", { onRequest: [server.authenticate]}, PizzaController.delete)
}
