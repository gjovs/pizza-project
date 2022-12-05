import { FastifyInstance } from "fastify";
import PizzaController from "../controller/ProductController";

export default async function productRoutes(server: FastifyInstance) {
  server.get("/", PizzaController.index);
  server.get("/promotion/", PizzaController.indexInPromotions);
  server.get("/liked/", PizzaController.getByLike)
  //   server.get("/filter/");

  //   server.get("/types");
}
