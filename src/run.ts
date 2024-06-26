import express from 'express';
import { Express, Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { config } from './config';

type App = {
  app: Express;
  db: typeof mongoose;
};

export const startApp = async (): Promise<App> => {
  const app: Express = express();
  try {
    // init db connexion
    // TODO: can be abstracted
    const db = await mongoose.connect(config.DB_URL);

    // register middlwares
    app.get('/', (req: Request, res: Response) => {
      res.send({ msg: 'Hello World, from Move Forward' });
    });

    return { app, db };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`An error occured while initilizing the app: ${error.message}`);
    throw error;
  }
};
