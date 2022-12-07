"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
class Server {
    static _instance;
    constructor() {
        this.server = (0, fastify_1.default)({
            logger: true,
        });
        this.middlewares();
        this.routes();
    }
    async middlewares() {
        await this.server.register(cors_1.default, { origin: true });
    }
    routes() {
        this.server.register(routes_1.productRoutes, { prefix: "/product" });
        this.server.register(routes_1.messageRoutes, { prefix: "/message" });
        this.server.register(routes_1.typesRoutes, { prefix: "/types" });
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.default = Server;
