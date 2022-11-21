import multer from "fastify-multer";

const opts = {
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype !== "image/png" &&
      file.mimetype !== "image/jpeg" &&
      file.mimetype !== "image/webp"
    ) {
      return cb(new multer.MulterError("Arquivo Precisa ser PNG ou JPG"));
    }

    return cb(null, true);
  },
  storage: multer.memoryStorage(),
};

const upload = multer(opts);

export default upload;
