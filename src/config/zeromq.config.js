
import zmq from "zeromq";

const ZMQ_ADDRESS = "tcp://127.0.0.1:5556";

async function bindZeroMQSocket() {
  const sock = zmq.socket("push");
  console.log("Starting producer on", ZMQ_ADDRESS);
  await sock.bind(ZMQ_ADDRESS);
  console.log("Producer bound to", ZMQ_ADDRESS);

  return sock;
}

export {
  bindZeroMQSocket,
};
