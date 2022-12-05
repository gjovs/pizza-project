"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
import Server from "../bin/v1/Server"
const server = Server.Instance.server

app.register(server);

export default async (req, res) => {
    await app.ready();
    app.server.emit('request', req, res);
}