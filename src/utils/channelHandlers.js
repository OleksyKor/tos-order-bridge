import { NewMessage } from "telegram/events/index.js";
import { tradeAlertsHandler } from "./chats/tradeAlerts/tradeAlertsHandler.js";
import { investorChannelHandler } from "./chats/investor/investorChannelHandler.js";

const chatConfig = [
  {
    id: 1302070350n,
    name: "Investors Channel",
    handler: investorChannelHandler,
  },
  {
    id: 1217563090n,
    name: "Trade alerts Channel",
    handler: tradeAlertsHandler,
  },
  // ... 
];

/**
 * Registers channel handlers for the Telegram client.
 * @param {TelegramClient} client - An instance of the Telegram client.
 * @param {ZeroMQ.Socket} sock - A ZeroMQ socket instance.
 */
function registerChannelHandlers(client, sock) {
  chatConfig.forEach(({ id, name, handler }) => {
    client.addEventHandler(handler(sock), new NewMessage({
      incoming: true,
      chats: [id],
    }));

    console.log(name, "is listening");
  });
}

export {
    registerChannelHandlers,
};
