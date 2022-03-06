import dotenv from 'dotenv';
dotenv.config();
export default {
  HOST: process.env.HOST as string,
  PORT: process.env.PORT as string,
  MONGO_URL: process.env.MONGO_URL as string
 }