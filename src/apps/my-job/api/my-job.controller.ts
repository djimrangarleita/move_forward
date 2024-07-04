import { Request, Response } from 'express-serve-static-core';
import { myJobService } from '../domain';
import { CreateMyJobDto } from '../types';

// TODO: Remember to filter by user
export const getCollection = async (req: Request, res: Response) => {
  try {
    const myJobs = await myJobService.findAll(req.user!.id);
    return res.status(200).send(myJobs);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newJob = req.body as CreateMyJobDto;
    newJob.userId = req.user!.id;
    const myJob = await myJobService.create(newJob);
    return res.status(201).send(myJob);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const myJob = await myJobService.findOneById(req.params.id, req.user!.id);
    if (!myJob) {
      return res.status(404).send({ status: 404, error: 'Not Found' });
    }
    return res.status(200).send(myJob);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const myJob = await myJobService.update(
      req.params.id,
      req.body,
      req.user!.id
    );
    if (!myJob) {
      return res.status(404).send({ status: 404, error: 'Not Found' });
    }
    return res.status(200).send(myJob);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    await myJobService.deleteItem(req.params.id, req.user!.id);
    return res.status(204).send();
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ status: 400, error: error.message });
  }
};
