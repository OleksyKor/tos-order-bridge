import { connectTelegramClient, getTelegramClient } from "./utils/telegramClient.js";
import { bindZeroMQSocket } from "./config/zeromq.config.js";
import { registerChannelHandlers } from "./chats/channelHandlers.js";

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
