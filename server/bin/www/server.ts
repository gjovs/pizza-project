import Server from "../../src/Server";

const port = 3333;

const server = Server.Instance.server;

server.listen(3333, () => {
  console.log(`working`);
});
