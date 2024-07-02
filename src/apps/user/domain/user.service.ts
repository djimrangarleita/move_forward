import { random, authentication } from '../../../libraries/auth';
import {
  InvalidCredentialsError,
  IsUniqueConstraintError,
} from '../../../libraries/error-handling/app.error';
import { userRepository } from '../data-access';
import { CreateUserDto, LoginDto, UserDto } from '../types';
import { UserRole } from '../user.enum';

export const findAll = async (filter?: object) =>
  await userRepository.findAll(filter);

export const findUserBySessionToken = async (
  sessionToken: string
): Promise<UserDto> => await userRepository.findOneBySessionToken(sessionToken);

export const register = async (user: CreateUserDto) => {
  const salt: string = random();

  user.authentication = {
    password: authentication(salt, user.authentication.password),
    salt,
    role: UserRole.USER,
  };
  try {
    await userRepository.findOneByEmail(user.email);
    throw new IsUniqueConstraintError();
  } catch (error) {
    if (error instanceof IsUniqueConstraintError) {
      throw new IsUniqueConstraintError('email');
    }
    return await userRepository.register(user);
  }
};

export const update = async (
  sessionToken: string,
  user: Map<string, any>
): Promise<UserDto | null> => {
  const dbUser = await userRepository.findOneBySessionToken(sessionToken);
  const resUser = { ...dbUser, ...user } as CreateUserDto & { id: string };
  console.log(resUser);
  return null;
  // return await userRepository.update(resUser);
};

export const login = async (credentials: LoginDto): Promise<string> => {
  const user = await userRepository.findOneByEmail(credentials.email, true);
  if (!user) {
    throw new InvalidCredentialsError('User not found');
  }
  const expectedHash = authentication(
    user.authentication.salt!,
    credentials.password
  );

  if (user.authentication.password !== expectedHash) {
    throw new InvalidCredentialsError('Wrong password');
  }

  const salt = random();

  const sessionToken = authentication(salt, user.id);

  user.authentication.sessionToken = sessionToken;

  userRepository.update(user);

  return sessionToken;
};
