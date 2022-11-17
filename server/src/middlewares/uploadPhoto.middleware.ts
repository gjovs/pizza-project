import { NextFunction } from "express";
import IMulterRequest from "../interface/multer.interface";
import firebaseService from "../services/firebase.service";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (!(req as IMulterRequest).file) {
    return res.status(400).josn({
      error: true,
    });
  }

  const { file } = (req as IMulterRequest);

  const link = await firebaseService.uploadImage(file);

  (req as IMulterRequest).file.path = link

  return next();
};
