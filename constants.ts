// import 'dotenv/config';
import dotenv from 'dotenv';
dotenv.config({
  path: ['.env.local', '.env'],
});

export const CLIENT = `./client/dist`;

export const PORT = 8080;

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_REMOTE_URL,
  DB_LOCAL_URL,
  DB_DIALECT,
} = process.env;

export const DATABASE = {
  name: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  local_url: DB_LOCAL_URL,
  remote_url: DB_REMOTE_URL,
  dialect: DB_DIALECT,
  // port: DB_PORT,
};