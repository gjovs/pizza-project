"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const routes_1 = require("./routes");
class Server {
    static _instance;
    constructor() {
        this.server = (0, fastify_1.default)({
            logger: true,
        });
        this.middlewares();
        this.decorators();
        this.routes();
    }
    async middlewares() {
        this.server.register(jwt_1.default, { secret: "mysecret" });
        this.server.register(multipart_1.default, { attachFieldsToBody: true });
        await this.server.register(cors_1.default, { origin: true });
    }
    decorators() {
        this.server.decorate("authenticate", async (req, rep) => {
            try {
                await req.jwtVerify();
            }
            catch (error) {
                return rep.send(error);
            }
        });
    }
    routes() {
        this.server.register(routes_1.userRoutes, { prefix: "/user" });
        this.server.register(routes_1.pizzaRoutes, { prefix: "/pizza" });
        this.server.register(routes_1.pizzaTypesRoutes, { prefix: "/pizza/types" });
        this.server.register(routes_1.stuffingRoutes, { prefix: "/stuffing" });
        this.server.register(routes_1.ingredientRoutes, { prefix: "/ingredient" });
        this.server.register(routes_1.drinkRoutes, { prefix: "/drink" });
        this.server.register(routes_1.drinkTypesRoutes, { prefix: "/drink/types" });
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.default = Server;
