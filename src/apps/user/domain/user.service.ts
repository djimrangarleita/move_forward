import { userRepository } from '../data-access';
import { CreateUserDto } from '../types';

export const findAll = async (filter?: object) =>
  await userRepository.findAll(filter);

export const register = async (user: CreateUserDto) =>
  await userRepository.register(user);
