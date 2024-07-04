import { NextFunction, Request, Response } from 'express-serve-static-core';
import { findUserBySessionToken } from '../../apps/user/domain/user.service';
import { AuthenticatedUser } from '../../apps/user/types';
import { config } from '../../config';
import { UserRole } from '../../apps/user/user.enum';

export const getUser = async (token: string) => {
  let user: AuthenticatedUser | undefined;
  try {
    const dbUser = await findUserBySessionToken(token);

    const authUser: AuthenticatedUser = {
      id: dbUser.id,
      email: dbUser.email,
      role: dbUser.authentication.role,
      sessionToken: token,
    };

    user = authUser;
  } catch (error) {
    console.log(error);
    user = undefined;
  }

  return user;
};

export const isGranted =
  (role: UserRole | undefined = undefined) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const token: string | null = req.cookies?.X_SESSION_TOKEN;

    // No auth required
    if (!role) {
      next();
    }

    // Auth required but no token
    if (!token) {
      return res.status(401).send({ status: 401, error: 'Unauthorized' });
    }

    const user = await getUser(token!);

    // Auth required and token found but no user found in db with token
    if (!user) {
      res.clearCookie('X_SESSION_TOKEN', {
        domain: config.APP_DOMAIN,
        path: '/',
      });
      return res.status(401).send({ status: 401, error: 'Unauthorized' });
    }

    // Auth required and user found but role mismatch and admin has all access
    if (user.role !== role && user.role !== UserRole.ADMIN) {
      return res.status(403).send({ status: 403, error: 'Forbidden' });
    }

    req.user = user;

    return next();
  };
