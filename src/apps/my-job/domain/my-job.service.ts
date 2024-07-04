import { myJobRepository } from '../data-access';
import { CreateMyJobDto, MyJobDto } from '../types';

export const findAll = async (userId?: string, filter?: object) => {
  if (userId) {
    filter = { ...filter, userId };
  }
  return await myJobRepository.findAll(filter);
};

export const create = async (myJob: CreateMyJobDto) =>
  await myJobRepository.create(myJob);

export const findOneById = async (id: string, userId?: string) =>
  await myJobRepository.findOneById(id, userId);

export const update = async (
  id: string,
  myJob: Omit<Partial<MyJobDto>, 'id'>,
  userId?: string
) => await myJobRepository.update(id, myJob, userId);

export const deleteItem = async (id: string, userId?: string) => {
  await myJobRepository.delete(id, userId);
};
