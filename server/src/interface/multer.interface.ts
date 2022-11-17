import { FastifyRequest } from "fastify";

export default interface IMulterRequest extends FastifyRequest {
  file: any;
}
