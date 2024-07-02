import express from 'express';
import { Express, Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { userRouter } from './apps/user/api/user.route';
import { isGranted } from './libraries/middleware/authentication';
import { UserRole } from './apps/user/user.enum';
import { securityRouter } from './apps/user/api/security.route';

type App = {
  app: Express;
  db: typeof mongoose;
};

export const startApp = async (): Promise<App> => {
  const app: Express = express();
  try {
    // TODO: can be abstracted
    const db = await mongoose.connect(config.DB_URL);

    app.use(express.json());

    app.use(cookieParser());

    // register middlwares
    app.get('/', (req: Request, res: Response) => {
      res.send({ msg: 'Hello World, from Move Forward' });
    });

    app.use('/api/users', isGranted(UserRole.USER), userRouter);

    app.use('/api/auth', securityRouter);

    return { app, db };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`An error occured while initilizing the app: ${error.message}`);
    throw error;
  }
};
