import { NextFunction, Express } from "express";
import firebaseService from "../services/firebase.service";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).josn({
      error: true,
    });
  }

  const link = await firebaseService.uploadImage(req.file);

  req.file.path = link;

  return next();
};
