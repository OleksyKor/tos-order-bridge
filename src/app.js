import { connectTelegramClient, getTelegramClient } from "./telegramClient";
import { bindZeroMQSocket } from "./zeromqSocket";
import { registerChannelHandlers } from "./utils/channelHandlers";

(async function run() {
  try {
    console.log(new Date().toLocaleString(), "Loading channels listeners");

    await connectTelegramClient();
    const client = getTelegramClient();

    const sock = await bindZeroMQSocket();

    registerChannelHandlers(client, sock);

  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
