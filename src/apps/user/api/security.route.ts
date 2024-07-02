import { Router } from 'express';
import * as user from './security.controller';

const securityRouter = Router();

securityRouter.post('/register', user.register);

securityRouter.post('/login', user.login);

export { securityRouter };
