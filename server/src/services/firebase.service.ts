import { FastifyRequest } from "fastify";
import * as admin from "firebase-admin";
import serviceAccount from "../configs/firebase-key.json";
import IFile from "../interface/file.interface";
import IMulterRequest from "../interface/multer.interface";

class FirebaseService {
  private BUCKET = "senai-pizzaria.appspot.com";
  private bucket: any;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: this.BUCKET,
    });

    this.bucket = admin.storage().bucket();
  }

  private getFileName(file: IFile): string {
    return Date.now() + "." + file.originalname.split(".").pop();
  }

  async uploadImage(image: IFile) {
    const fileName = this.getFileName(image);
    const file = this.bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });

    stream.on("error", (e: Error) => {
      console.log(e);
    });

    stream.on("finish", async () => {
      await file.makePublic();
      const firebaseURL = `https://storage.googleapis.com/${this.BUCKET}/${fileName}`;
    });

    stream.end(image.buffer);
  }
}

export default new FirebaseService();
