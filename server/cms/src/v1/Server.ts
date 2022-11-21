import cors from "@fastify/cors";

import Fastify, { FastifyInstance } from "fastify";
import Multer from "fastify-multer";

import { userRoutes } from "./routes";

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
    this.server.register(Multer.contentParser);
    await this.server.register(cors, { origin: true });
  }

  private routes() {
    this.server.register(userRoutes, { prefix: "/user" });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}
