import mongoose, { Document, ObjectId } from 'mongoose';
import { CreateUserDto, IUserRepository, UserDto } from '../../types';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    length: {
      min: 3,
      max: 50,
    },
  },
  displayName: {
    type: String,
    required: false,
    length: {
      min: 3,
      max: 50,
    },
  },
  email: {
    type: String,
    required: true,
    length: {
      min: 3,
      max: 50,
    },
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  goal: {
    type: String,
    length: {
      min: 6,
      max: 120,
    },
  },
  authentication: {
    password: {
      type: String,
      required: true,
      length: {
        min: 8,
        max: 50,
      },
      select: false,
    },
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model('User', UserSchema);

class MongooseUserRepository implements IUserRepository {
  private userModel;

  constructor() {
    this.userModel = mongoose.model('User', UserSchema);
  }

  async findAll(filter?: object): Promise<Array<UserDto | null>> {
    const users = await this.userModel.find({ ...filter });
    const userList: UserDto[] = [];

    users.forEach(user => {
      const tmp = user as UserDto & Document;
      userList.push(MongooseUserRepository.toDto(tmp));
    });
    return userList;
  }

  async findOneById(
    id: mongoose.Schema.Types.ObjectId
  ): Promise<UserDto | null> {
    const user = (await this.userModel.findById(id)) as UserDto & Document;
    return MongooseUserRepository.toDto(user);
  }

  async findOneByEmail(email: string): Promise<UserDto | null> {
    const user = (await this.userModel.findOne({ email })) as UserDto &
      Document;
    return MongooseUserRepository.toDto(user);
  }

  async findOneBySessionToken(sessionToken: string): Promise<UserDto | null> {
    const user = (await this.userModel.findOne({
      'authentication.sessionsToken': sessionToken,
    })) as UserDto & Document;
    return MongooseUserRepository.toDto(user);
  }

  async register(user: CreateUserDto): Promise<UserDto> {
    // const newUser = new UserModel({ ...user });
    const savedUser = (await this.userModel.create({ ...user })) as UserDto &
      Document;
    return MongooseUserRepository.toDto(savedUser);
  }

  async delete(id: ObjectId): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  private static toDto(userDocument: UserDto & Document): UserDto {
    return {
      id: userDocument._id as string,
      name: userDocument.name,
      displayName: userDocument.displayName,
      email: userDocument.email,
      gender: userDocument.gender,
      goal: userDocument.goal,
      createdAt: userDocument.createdAt,
      updatedAt: userDocument.updatedAt,
      birthday: userDocument.birthday,
      authentication: userDocument.authentication,
    };
  }
}

export default MongooseUserRepository;
