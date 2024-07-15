import express from 'express';
import { Express, Request, Response } from 'express-serve-static-core';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from './config';
import { userRouter } from './apps/user/api/user.route';
import { isGranted } from './libraries/middleware/authentication';
import { UserRole } from './apps/user/user.enum';
import { securityRouter } from './apps/user/api/security.route';
import myJobRoute from './apps/my-job/api/my-job.route';

type App = {
  app: Express;
  db: typeof mongoose;
};

export const startApp = async (): Promise<App> => {
  const app: Express = express();
  try {
    // TODO: can be abstracted
    const db = await mongoose.connect(config.DB_URL);

    const corsOptions = {
      origin: config.APP_CLIENT_ORIGIN,
      credentials: true,
    };

    app.use(cors(corsOptions));

    app.use(express.json());

    app.use(cookieParser());

    app.use('/api/status', (req: Request, res: Response) =>
      res
        .status(200)
        .send({ status: 200, msg: 'Move Forward is up and running' })
    );

    app.use('/api/auth', securityRouter);

    app.use('/api/users', isGranted(UserRole.USER), userRouter);

    app.use('/api/my-job', isGranted(UserRole.USER), myJobRoute);

    app.use((req: Request, res: Response) => {
      res.status(404).json({ status: 404, error: 'Not found' });
    });

    return { app, db };
  } catch (error: any) {
    console.log(`An error occured while initilizing the app: ${error.message}`);
    throw error;
  }
};
