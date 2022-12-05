"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../../controllers/");
const User_1 = __importDefault(require("../../models/User"));
const user_schema_1 = require("./user.schema");
async function userRoutes(server) {
    server.get("/count", { onRequest: [server.authenticate] }, controllers_1.UserController.count);
    server.post("/register", { schema: user_schema_1.createUserOptions, onRequest: [server.authenticate] }, controllers_1.UserController.save);
    server.post("/login", { schema: user_schema_1.loginOptions }, async (req, rep) => {
        const { email, password } = req.body;
        const user = await User_1.default.getUserByEmail(email);
        if (user.length <= 0) {
            return rep.status(404).send({
                code: 404,
                error: true,
                message: ["Email not founded"],
            });
        }
        if (!(user[0].password === password)) {
            return rep.status(401).send({
                error: true,
                code: 401,
                message: ["Invalid Password! - Unauthorized"],
            });
        }
        const data = { payload: user[0] };
        const token = server.jwt.sign(data);
        return rep.send({
            code: 200,
            error: false,
            payload: { token },
        });
    });
    server.delete("/:id", { onRequest: [server.authenticate] }, controllers_1.UserController.delete);
    server.put("/:id", { onRequest: [server.authenticate] }, controllers_1.UserController.update);
}
exports.default = userRoutes;
