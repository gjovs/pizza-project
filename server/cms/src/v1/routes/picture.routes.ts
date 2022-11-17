import { Router } from "express";
import upload from "../configs/multer";
import { PhotoController } from "../controllers";
import { uploadPhotoMiddleware } from "../middlewares";

const router: Router = Router();

router.post(
  '',
  upload.single("avatar"),
  uploadPhotoMiddleware,
  PhotoController.store
);

export default router;
