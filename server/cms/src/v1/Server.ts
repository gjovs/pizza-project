import cors from "@fastify/cors";
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

import {
  userRoutes,
  pizzaRoutes,
  pizzaTypesRoutes,
  ingredientRoutes,
  drinkRoutes,
  drinkTypesRoutes,
  stuffingRoutes,
} from "./routes";

export default class Server {
  private static _instance: Server | null;

  declare server: FastifyInstance;

  private constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();
    this.decorators();
    this.routes();
  }
  private async middlewares() {
    this.server.register(jwt, { secret: "mysecret" });
    this.server.register(multipart, { attachFieldsToBody: true });
    await this.server.register(cors, { origin: true });
  }

  private decorators() {
    // Decorate request with a 'user' property
    this.server.decorate(
      "authenticate",
      async (req: FastifyRequest, rep: FastifyReply) => {
        try {
          await req.jwtVerify();
        } catch (error) {
          rep.send(error);
        }
      }
    );
  }

  private routes() {
    this.server.register(userRoutes, { prefix: "/user" });
    this.server.register(pizzaRoutes, { prefix: "/pizza" });
    this.server.register(pizzaTypesRoutes, { prefix: "/pizza/types" });
    this.server.register(stuffingRoutes, { prefix: "/stuffing" });
    this.server.register(ingredientRoutes, { prefix: "/ingredient" });
    this.server.register(drinkRoutes, { prefix: "/drink" });
    this.server.register(drinkTypesRoutes, { prefix: "/drink/types" });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
