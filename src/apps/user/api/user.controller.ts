import { Request, Response } from 'express';
import { userService } from '../domain';
import { CreateUserDto } from '../types';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ msg: 'Unexpected error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const rawUser = req.body as CreateUserDto;
    const user = await userService.register(rawUser);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(400).send({ msg: 'Unexpected error' });
  }
};
