/**
 * This code handles events for two chats in Telegram
 * and pushes them out through a ZeroMQ socket.
 */
import { StringSession } from 'telegram/sessions';
import { TelegramClient } from "telegram";

import { stringSession, apiId, apiHash } from './config/telegram.config.json';
import { socket } from "zeromq";

/**
 * Create a StringSession and ZeroMQ socket
*/
const STRING_SESSION = new StringSession(stringSession);
const sock = socket("push");

/**
 * Asynchronous main 
 */
(async function run() {
    console.log(new Date().toLocaleString(), 'Loading channels listeners')
    
    // Instantiate TelegramClient
    const client = new TelegramClient(STRING_SESSION, apiId, apiHash, { connectionRetries: 5 })
    await client.connect();
    await client.getMe();

    // Bind ZeroMQ socket
    console.log("starting producer on port 5555");
    sock.bindSync("tcp://127.0.0.1:5555");
    console.log("Producer bound to port 5555");

})()



