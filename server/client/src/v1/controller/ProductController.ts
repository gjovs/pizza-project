import { FastifyReply, FastifyRequest } from "fastify";
import Product from "../models/Product";

class PizzaController {
  async index(req: FastifyRequest, rep: FastifyReply) {
    const response = await Product.index();

    return response;
  }

  async indexInPromotions(req: FastifyRequest, rep: FastifyReply) {
    const response = await Product.getProductInPromotions();

    return response;
  }

  async getByLike(req: FastifyRequest, rep: FastifyReply) {
    const response = await Product.getByMostLiked();

    return response;
  }
}

export default new PizzaController();
