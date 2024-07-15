import dotenv from 'dotenv';

dotenv.config();

type Config = {
  NODE_ENV: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_URL: string;
  APP_PORT: number;
  APP_SECRET: string;
  APP_DOMAIN: string;
  APP_CLIENT_ORIGIN: string;
};

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_NAME: process.env.DB_NAME || 'move_forward',
  DB_USER: process.env.DB_USER || 'user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'default-password',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/move_forward',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  APP_SECRET: process.env.APP_SECRET || 'secret-that-should-be-secret',
  APP_DOMAIN: process.env.APP_DOMAIN || 'localhost',
  APP_CLIENT_ORIGIN:
    (process.env.NODE_ENV === 'production'
      ? process.env.APP_CLIENT_ORIGIN_PROD
      : process.env.APP_CLIENT_ORIGIN_DEV) || 'http://localhost',
};
