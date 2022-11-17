import { z, ZodError } from "zod";
import { Request, Response } from "express";

class PhotoController {
  async store(req: Request, res: Response) {
    const pathUrl = req.file?.path;

    

    return res.status(200).json({
      code: 200,
      error: false,
      payload: {
        url: pathUrl,
      },
    });
  }
}

export default new PhotoController();
