import dotenv from 'dotenv';
// dotenv.config({ path: `${__dirname}/config.env` });
dotenv.config();

type Config = {
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_URL: string;
  APP_PORT: number;
};

export const config: Config = {
  DB_NAME: process.env.DB_NAME || 'move_forward',
  DB_USER: process.env.DB_USER || 'user',
  DB_PASSWORD: process.env.DB_PASSWORD || 'default-password',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/move_forward',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
};
