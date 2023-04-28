import zmq from "zeromq";

const ZMQ_ADDRESS = "tcp://127.0.0.1:5556";

/**
 * Binds a ZeroMQ socket to the specified address.
 * @returns {ZeroMQ.Socket} - A ZeroMQ socket instance.
 */
async function bindZeroMQSocket() {
  const sock = zmq.socket("push");

  // Set up the ZeroMQ socket
  const endpoint = process.env.ZEROMQ_ENDPOINT || ZMQ_ADDRESS;
  console.log("Starting producer on", endpoint);
  await sock.connect(endpoint);

  console.log("Producer bound to", endpoint);

  return sock;
}

export { bindZeroMQSocket };
