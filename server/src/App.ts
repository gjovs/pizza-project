import Fastify from "fastify";
import cors from '@fastify/cors'

import { FastifyInstance } from "fastify";

import { homeRoutes } from "./routes";

class App {
  declare server: FastifyInstance;

  constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();

    this.routes();  
  }


  async middlewares() {
    await this.server.register(cors, {
      origin: true,
    });
  }

  routes() {
    this.server.register(homeRoutes, { prefix: '/' });
  }
}

export default new App().server;
