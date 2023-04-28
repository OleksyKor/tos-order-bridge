import * as dotenv from 'dotenv';

// Load environment variables from the '.env' file into 'process.env'.
dotenv.config();

const { API_ID, API_HASH, STRING_SESSION } = process.env;

if (!API_ID || !API_HASH || !STRING_SESSION) {
  throw new Error('API_ID, API_HASH, and STRING_SESSION must be set in the environment.');
}

export default {
  apiId: +API_ID,
  apiHash: API_HASH,
  stringSession: STRING_SESSION,
  connectionRetries: 5,
};