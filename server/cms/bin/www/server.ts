import Server from "../../src/v1/Server";

const port = 3333;

const server = Server.Instance.server;

server.listen(3333, () => {
  console.log(`working`);
});
