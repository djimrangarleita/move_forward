import { Router } from 'express';
import * as user from './user.controller';

const userRouter = Router();

userRouter.get('/', user.getUsers);

userRouter.post('/', user.createUser);

export { userRouter };
