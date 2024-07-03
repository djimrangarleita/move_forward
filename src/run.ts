import express from 'express';
import { Express, Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from './config';
import { userRouter } from './apps/user/api/user.route';
import { isGranted } from './libraries/middleware/authentication';
import { UserRole } from './apps/user/user.enum';
import { securityRouter } from './apps/user/api/security.route';
import myJobRoute from './apps/my-job/api/my_job.route';

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

    app.get('/', (req: Request, res: Response) => {
      res.send({ status: 200, msg: 'Move Forward is up and running' });
    });

    app.use('/api/users', isGranted(UserRole.USER), userRouter);

    app.use('/api/auth', securityRouter);

    app.use('/api/my_job', myJobRoute);

    app.use((req: Request, res: Response) => {
      res.status(404).json({ status: 404, error: 'Not found' });
    });

    return { app, db };
  } catch (error: any) {
    console.log(`An error occured while initilizing the app: ${error.message}`);
    throw error;
  }
};
