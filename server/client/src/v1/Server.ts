import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { productRoutes } from "./routes";
import messageRoutes from "./routes/messageRoutes";

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
    await this.server.register(cors, { origin: true });
  }

  private routes() {
    this.server.register(productRoutes, { prefix: "/product" });
    this.server.register(messageRoutes, { prefix: "/message"})
    // TODO make the types pizza and drink routes (pizza, type and stuffing and ingredient filters)
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
