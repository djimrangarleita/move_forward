import { Router } from 'express';
import * as user from './user.controller';
import { isGranted } from '../../../libraries/middleware/authentication';
import { UserRole } from '../user.enum';

const userRouter = Router();

userRouter.get('/', isGranted(UserRole.ADMIN), user.getUsers);

userRouter.patch('/', user.updateUser);

userRouter.delete('/:id', user.deleteUser);

userRouter.get('/profile', user.getUser);

export { userRouter };
