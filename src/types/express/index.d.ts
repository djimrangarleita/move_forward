import { AuthenticatedUser } from '../../apps/user/types';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}
