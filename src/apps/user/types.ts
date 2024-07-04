import { ObjectId } from 'mongoose';

export type Authentication = {
  password: string;
  role: string;
  salt?: string;
  sessionToken?: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  displayName?: string;
  gender?: string;
  birthday?: Date;
  goal?: string;
  authentication: Authentication;
};

export type UserDto = CreateUserDto & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LoginDto = {
  email: string;
  password: string;
};

export interface IUserRepository {
  findAll(filter?: object): Promise<Array<UserDto | null>>;
  findOneById(id: ObjectId): Promise<UserDto | null>;
  findOneByEmail(email: string): Promise<UserDto | null>;
  findOneBySessionToken(sessionToken: string): Promise<UserDto | null>;
  register(user: CreateUserDto): Promise<UserDto>;
  delete(id: ObjectId): Promise<void>;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  sessionToken: string;
}
