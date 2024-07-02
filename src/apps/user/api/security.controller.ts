import { Request, Response } from 'express';
import { userService } from '../domain';
import { CreateUserDto, LoginDto } from '../types';
import { config } from '../../../config';

export const register = async (req: Request, res: Response) => {
  try {
    const rawUser = req.body as CreateUserDto;
    const user = await userService.register(rawUser);
    return res.status(201).send(user);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const credentials: LoginDto = {
      email: req.body.email,
      password: req.body.password,
    };

    const sessionToken = await userService.login(credentials);
    res.cookie('X_SESSION_TOKEN', sessionToken, {
      domain: config.APP_DOMAIN,
      path: '/',
    });
    return res.status(200).send({ msg: 'Cookie authentication successful' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Invalid credentials' });
  }
};
