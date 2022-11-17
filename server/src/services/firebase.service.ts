import { FastifyReply, FastifyRequest } from "fastify";
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import IMulterRequest from "../interface/multer.interface";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import IFile from "../interface/file.interface";

const options = {
  type: "service_account",
  project_id: "senai-pizzaria",
  private_key_id: "fb9a6578cb43dccce162aeac36a50cd4a429c8a9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNJdUyGMT+u2eJ\nn/vcjzANRtw1gSuP6RfcGcpQ7Zznakp+v3mWK17quwjB2KeB4VJ26uOJwzcbLruA\n0rRUbPXi0hSr8aAkcg4Z0yG3vRu9TLofa8YxLEnjot+OpLTLftxrVC5/MJ+n9vR1\nLQKwNIwl0qppeUes8oPBoLsGkoMf5eg3NrerOd25Bl/78O97IZ2b0xlpKFzoGgMe\n9uqkYxK6Qy6XTg+qlqYA+M0jrHG5ig7I+h78b8BgzCGw9y4QqCp85j3POJkqviQc\nlhZN9zFHHDFsYhJCDOej6Z3Lw8+ExMK6nqwFv/aitTk6l+OV0yLxc4fCH57sFtIZ\nP/xUPkeZAgMBAAECggEAEhGNRK/6C9fmra3+umHUF2cCSpEiB/ahWMouZYS9aLxp\nE+ekA27C5E6UFOiMrOowuctg3GJSnBaz5w5SClq2cVZOUiKIyxGUr4ahEtnRAr8f\nNmWABgxy2wKfFq4L/N7dDZpFp3+MeJ569cMQzIi1hiP9L6pYXBHhfvh56KH5yive\nC1fsi2dJIzoiyiwHAQNLqVnnwmLFBehd59YsUrvBwo0JwOzLoZAeNGDgicxxNug4\nL0TqwKwpM1bbtgxLno0YwOHheZOsRVrXhfsSmfBivE9cg1Y0NP8kKmdjJSWpzZHI\nXw3E3C3f/kMbbFExLN3nKYDYunxJAZrbvLhqPo6EJwKBgQDCi0tgVkqhIHrCAteg\nl33cCW3ZHghQNQVRHES+3i6V7rsn/IsGXDLY5aC5dC6yg69uijAyKyCo7XYf0xue\nClLXIThcSE5IQbqJ/h0/LcfRMvBY7gHDJ9XCggcgC4kIK2xUE1i5aSjvxxYKEr6r\n45tKUm+ATGIwj1FBdCm93iRqMwKBgQC5vGXj3uzufnpQoASRfEsyvrsVp/Lr88ZL\nYnZ65pfy+6DLTRIknvCplpbFaS/QGsow8dAx8fJY342iJWIQjkiH46G5sRyzKl9R\nCujPZ73XZizzGJqyY9ITnaJNhZ4PATuRRuOxtZLypznDoB4DKfghoSqvCNV6BbAe\nRlXSWZPTAwKBgEeKObm/gcomy3201d50VxAnV4HUDXKRTNc68fzOb4srMx/NOsKn\n/PrN1oDcPJ/g1Q5tOrP4MBZu3FVvqGRBn50E1lj5LfBcW2CLVe35w9UmSkQpofRG\nHdFdR4l9NHMQpNF2G9Zy2V7zcyNZKUzEckKuddpUPHdm/JZ5RTBRFEsJAoGBALbp\nDf5mXzZPX+1eaKFNolCK/HrLNrOfEjzS7pMB28nye9s6Pw/JZn/cSQaIHAn5F/0z\nZjCJcHyNS1HPNs/PDyajyXSxMu5OYCfTcoouRAqIGOQd6tqa6xteNaPaXlmwgRUE\nlt8/TUOh44T/fg7nmfCkYwCU1oaga1ylL4dDqAw5AoGACN1qn+ZZxC4It3MisPIp\nPTySZ49cuWvMUJ4gpDmy+6OkS7gwFAhvfKDQtzemr/9QCH60pzbvDCX5WSCNRqEW\nPIz/IJuv1t3oZ4Rr1UIycDbEed8sBw4WXtUVEAvOL5cxd03b0BRNPkFebdb7zyGc\n+reD70JyxfWeTaEHbug7Tlg=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-d9t44@senai-pizzaria.iam.gserviceaccount.com",
  client_id: "100550928483513611494",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d9t44%40senai-pizzaria.iam.gserviceaccount.com",
};

class FirebaseService {
  constructor(
    private app = admin.initializeApp({
      credential: admin.credential.cert(options),
      storageBucket: "senai-pizzaria.appspot.com",
    })
  ) {}

  async uploadImage(fileParameter: IFile): Promise<string> {
    const imagem = fileParameter;

    const bucket = admin.storage().bucket();

    const fileName = Date.now() + "." + imagem.originalname.split(".").pop();

    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: imagem.mimetype,
      },
    });

    stream.on("error", (err: Error) => console.log(err));

    stream.on("finish", async () => {
      await file.makePublic();
    });

    console.log(imagem);

    stream.end(imagem.buffer);

    return `https://storage.googleapis.com/senai-pizzaria.appspot.com/${fileName}`;
  }
}

export default new FirebaseService();
