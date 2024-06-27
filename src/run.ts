import express from 'express';
import { Express, Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import { config } from './config';
import { userRouter } from './apps/user/api/user.route';

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

    app.use(express.json());

    // register middlwares
    app.get('/', (req: Request, res: Response) => {
      res.send({ msg: 'Hello World, from Move Forward' });
    });

    app.use('/api/users', userRouter);

    return { app, db };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`An error occured while initilizing the app: ${error.message}`);
    throw error;
  }
};
