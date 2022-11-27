import { FastifyRequest, FastifyReply } from "fastify";
import { FirebaseService } from "../services";
import User from "../models/User";

class UserController {
  async save(req: FastifyRequest, rep: FastifyReply) {
    const { body } = req;

    // @ts-ignore
    const { profile_picture, name, email, password, cellphone, phone } = body;

    await profile_picture.toBuffer();

    const url = await FirebaseService.uploadImage(profile_picture);

    const user = await User.save({
      id: -1,
      profile_picture: url,
      name,
      email,
      password,
      cellphone,
      phone,
      isAdmin: false,
    });

    return rep.send({
      statusCode: 200,
      error: false,
      payload: [user],
    });
  }

  async auth(req: FastifyRequest, rep: FastifyReply) {
    const { email, password } = req.body
    
    
  }
}

export default new UserController();
