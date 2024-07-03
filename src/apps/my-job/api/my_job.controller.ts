import { Request, Response } from 'express-serve-static-core';
import { myJobService } from '../domain';
import { CreateJobDto } from '../types';

export const getCollection = async (req: Request, res: Response) => {
  try {
    const myJobs = await myJobService.findAll();
    return res.status(200).send({ status: 200, data: myJobs });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newJob = req.body as CreateJobDto;
    const myJob = await myJobService.create(newJob);
    return res.status(201).send({ status: 201, msg: myJob });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const myJob = await myJobService.findOneById(req.params.id);
    return res.status(200).send({ status: 200, msg: myJob });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const myJob = await myJobService.update(req.params.id);
    return res.status(200).send({ status: 200, msg: myJob });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    await myJobService.deleteItem(req.params.id);
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, error: 'Unexpected error' });
  }
};
