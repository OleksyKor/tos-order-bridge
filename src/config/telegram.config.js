import * as dotenv from 'dotenv';

import { StringSession } from "telegram/sessions";
import { TelegramClient } from "telegram";

dotenv.config()

const tgApiConfig = {
  apiId: process.env.API_ID,
  apiHash: process.env.API_HASH,
  stringSession: process.env.STRING_SESSION,
};

const STRING_SESSION = new StringSession(tgApiConfig.stringSession);

const client = new TelegramClient(STRING_SESSION, tgApiConfig.apiId, tgApiConfig.apiHash, {
  connectionRetries: 5,
});

async function connectTelegramClient() {
  await client.connect();
  await client.getMe();
}

function getTelegramClient() {
  return client;
}

export default {
  connectTelegramClient,
  getTelegramClient,
}