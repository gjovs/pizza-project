import multer from "fastify-multer";

const upload = multer({ dest: "../uploads/" });

export default upload;
