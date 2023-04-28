import { StringSession } from "telegram/sessions/index.js";
import { TelegramClient } from "telegram";
import config from '../config/telegram.config.js';

// Initialize the StringSession
const STRING_SESSION = new StringSession(config.stringSession);

// Create an instance of the TelegramClient
const client = new TelegramClient(STRING_SESSION, config.apiId, config.apiHash, {
  connectionRetries: config.connectionRetries,
});

/**
 * Connects the Telegram client.
 */
async function connectTelegramClient() {
  try {
    await client.connect();
    console.log('Connected to Telegram');
  } catch (err) {
    console.error(`Error connecting to Telegram: ${err}`);
    process.exit(1);
  }
}

/**
 * Returns the instance of the Telegram client.
 */
function getTelegramClient() {
  return client;
}

export {
  connectTelegramClient,
  getTelegramClient,
};
