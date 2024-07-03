import { CreateJobDto } from '../types';

export const findAll = async (filter?: Map<string, any>) =>
  `I am find all ${filter}`;

export const create = async (myJob: CreateJobDto) =>
  `I am create job ${myJob.title}`;

export const findOneById = async (id: string) => `I am find one by id ${id}`;

export const update = async (id: string) => `I am update ${id}`;

export const deleteItem = async (id: string) => `I am delete ${id}`;
