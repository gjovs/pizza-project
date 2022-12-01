import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

import { userRoutes } from "./routes";
import pizzaRoutes from "./routes/pizza/pizza.routes";
import pizzaTypesRoutes from "./routes/pizza/types/pizzaTypes.routes";
import stuffingRoutes from "./routes/stuffing/stuffing.routes";
import ingredientRoutes from "./routes/ingredient/ingredient.routes";
import drinkRoutes from "./routes/drink/drink.routes";

export default class Server {
  private static _instance: Server | null;

  declare server: FastifyInstance;

  private constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();
    this.routes();
  }
  private async middlewares() {
    this.server.register(jwt, { secret: "mysecret" });
    this.server.register(multipart, { attachFieldsToBody: true });
    await this.server.register(cors, { origin: true });
  }

  private routes() {
    this.server.register(userRoutes, { prefix: "/user" });
    this.server.register(pizzaRoutes, { prefix: "/pizza" });
    this.server.register(pizzaTypesRoutes, { prefix: "/pizza/types" });
    this.server.register(stuffingRoutes, { prefix: "/stuffing" });
    this.server.register(ingredientRoutes, { prefix: "/ingredient" });
    this.server.register(drinkRoutes, { prefix: "/drink" });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
