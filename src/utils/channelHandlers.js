import { NewMessage } from "telegram/events";
import { tradeAlertsHandler } from "./utils/tradeAlertsHandler";
import { investorsChannelHandler } from "./utils/investorsChannelHandler";

const chatConfig = [
  {
    id: 1302070350n,
    name: "Investors Channel",
    handler: investorsChannelHandler,
  },
  {
    id: 1217563090n,
    name: "Trade Alerts Channel",
    handler: tradeAlertsHandler,
  },
  // ... 
];

function registerChannelHandlers(client, sock) {
  chatConfig.forEach(({ id, name, handler }) => {
    client.addEventHandler(handler(sock), new NewMessage({
      incoming: true,
      chats: [id],
    }));

    console.log(name, "is listening");
  });
}

export default {
    registerChannelHandlers,
};
