import Server from "../../src/Server";

const port = 3333;

const server = Server.instance.server;

server.listen({ port });
