
import { TelegramClient } from "telegram";
import { text } from 'input';


(async function run() {
    console.log(new Date().toLocaleString(), 'Preparing to login')

    const client = new TelegramClient("", apiId, apiHash, { connectionRetries: 5 })

    await client.start({
        phoneNumber: async () => await text('number ?'),
        password: async () => await text('password ?'),
        phoneCode: async () => await text('Code ?'),
        onError: (err) => console.log(err),
    }).

    console.log('You should now be connected.')
    console.log('Save next string into .env file into STRING_SESSION property')

    console.log(client.session.save()) // Save this string to avoid logging in again
})()


