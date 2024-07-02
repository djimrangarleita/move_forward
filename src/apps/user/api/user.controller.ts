import { Request, Response } from 'express';
import { userService } from '../domain';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.findAll();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.findUserBySessionToken(
      req.cookies?.X_SESSION_TOKEN
    );
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // const user = await userService.update(
    //   req.cookies?.X_SESSION_TOKEN,
    //   req.body
    // );
    return res.status(501).send({ status: 501, error: 'Available soon' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    return res.status(501).send({ status: 501, error: 'Available soon' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};
