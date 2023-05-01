# TOS Order Bridge
Automated bridge for extracting, parsing TOS orders from Telegram channels, and forwarding the parsed data to another app via ZeroMQ

## Setting Up the Code Repository
### Initial Setup
1. Install the project dependencies:
```bash
npm install
```

2. Create a `.env` file containing the access keys:
```plaintext
API_ID=<key_value>
API_HASH=<key_value>
STRING_SESSION=<key_value>
```

### Obtaining API_ID and API_HASH
Follow the [Telegram guide](https://core.telegram.org/api/obtaining_api_id) to obtain the `API_ID` and `API_HASH`.

To obtain the `STRING_SESSION`, follow these steps:

1. Log in to your [Telegram account](https://my.telegram.org/).
2. Click on "API development tools" and fill in your application details (only the app title and short name are required).
3. Click "Create application".

> ⚠️ **Important:** Never share your API or authorization details, as doing so will compromise your application and account security.

After successfully creating the application, replace the `apiId` and `apiHash` values in the `.env` file with the ones you received from Telegram.

### Obtaining the STRING_SESSION
Run the following command to send a message to yourself, and you will be prompted to provide your login credentials and session token:

```bash
npm run login
```

Copy and paste the session token into the `STRING_SESSION` value in the `.env` file.