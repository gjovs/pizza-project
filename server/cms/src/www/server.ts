import Server from "../v1/Server";

const port = 3333;

const server = Server.Instance.server;

try {
  server.listen({ port });
} catch (err) {
  console.log(err);
}
