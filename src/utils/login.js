import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import config from "../config/telegram.config.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

// Initialize the StringSession
const STRING_SESSION = new StringSession("");

(async function run() {
  try {
    console.log(`\n🚀 ${new Date().toLocaleString()} - Starting the Telegram login process`);
    console.log('\n' + '-'.repeat(12) + '\n');

    const client = new TelegramClient(
      STRING_SESSION,
      config.apiId,
      config.apiHash,
      { connectionRetries: 5 }
    );

    await client.start({
      phoneNumber: async () =>
        await getUserInput(
          "Please enter your phone number (including country code, e.g., +1234567890): "
        ),
      password: async () =>
        await getUserInput(
          "If your account has two-step verification enabled, please enter your password: "
        ),
      phoneCode: async () =>
        await getUserInput(
          "Telegram sent a 5-digit login code to your app. Please enter the code: "
        ),
        onError: (err) => console.log(`\n❌ An error occurred during the login process: ${err}`),
    });

    console.log("✅ You are now connected to Telegram.");
    console.log("🔑 To avoid logging in again, save the following session string in the .env file under the STRING_SESSION property:");
    console.log(client.session.save());

    process.exit(0);
  } catch (error) {
    console.error("❌ An error occurred during the login process:", error);
    process.exit(1);
  } finally {
    // Close the readline interface after the process is complete or an error occurs
    rl.close();
  }
})();
