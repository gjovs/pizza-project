import { FastifyRequest } from "fastify";
import { File as IFile } from "fastify-multer/lib/interfaces";

export default interface IUserRequest extends FastifyRequest {
  path: string;
  file: IFile;
}
