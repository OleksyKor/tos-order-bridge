import { Push } from "zeromq";

const ZMQ_ADDRESS = "tcp://127.0.0.1:5555";

async function bindZeroMQSocket() {
  const sock = new Push();
  console.log("Starting producer on", ZMQ_ADDRESS);
  await sock.bind(ZMQ_ADDRESS);
  console.log("Producer bound to", ZMQ_ADDRESS);

  return sock;
}

export default {
  bindZeroMQSocket,
};
