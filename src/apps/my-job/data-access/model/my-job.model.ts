import { Schema, Document, model } from 'mongoose';
import { CreateMyJobDto, IMyJob, MyJobDto } from '../../types';

const MyJobSchema = new Schema({
  title: {
    type: String,
    required: true,
    length: {
      min: 3,
      max: 50,
    },
  },
  company: {
    type: String,
    required: true,
    length: {
      min: 3,
      max: 60,
    },
  },
  reference: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  keywords: {
    type: String,
  },
  description: {
    type: String,
    length: {
      min: 5,
    },
  },
  status: {
    type: String,
    default: 'interested',
  },
  profileMatching: {
    type: Number,
    min: 1,
    max: 10,
    default: 1,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
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

export class MongooseMyJobRepository implements IMyJob {
  private myJobModel;

  constructor() {
    // TODO: Change this name to MyJob
    this.myJobModel = model<MyJobDto & Document>('MyJobModel', MyJobSchema);
  }

  async findAll(filter?: object): Promise<Array<MyJobDto | null>> {
    const myJobs: MyJobDto[] = [];
    const myJobsDb = await this.myJobModel.find({ ...filter });
    myJobsDb.forEach(myJob => {
      myJobs.push(MongooseMyJobRepository.toDto(myJob));
    });
    return myJobs;
  }

  async create(myJob: CreateMyJobDto): Promise<MyJobDto | null> {
    const myJobDb = await this.myJobModel.create(myJob);
    if (!myJobDb) {
      return null;
    }
    return MongooseMyJobRepository.toDto(myJobDb);
  }

  async findOneById(id: string, userId?: string): Promise<MyJobDto | null> {
    let filter = {};
    if (userId) {
      filter = { userId };
    }
    filter = { _id: id, ...filter };
    const myJobDb = await this.myJobModel.findOne(filter);
    if (!myJobDb) {
      return null;
    }
    return MongooseMyJobRepository.toDto(myJobDb);
  }

  async update(
    id: string,
    myJob: Omit<Partial<MyJobDto>, 'id'>,
    userId?: string
  ): Promise<MyJobDto | null> {
    let filter = {};
    if (userId) {
      filter = { userId };
    }
    filter = { _id: id, ...filter };
    const myJobDb = await this.myJobModel.findOneAndUpdate(filter, myJob);
    if (!myJobDb) {
      return null;
    }
    return MongooseMyJobRepository.toDto(myJobDb);
  }

  async delete(id: string, userId?: string): Promise<void> {
    let filter = {};
    if (userId) {
      filter = { userId };
    }
    filter = { _id: id, ...filter };
    await this.myJobModel.findOneAndDelete(filter);
  }

  private static toDto(myJob: MyJobDto & Document): MyJobDto {
    return {
      id: String(myJob._id),
      title: myJob.title,
      company: myJob.company,
      reference: myJob.reference,
      keywords: myJob.keywords,
      deadline: myJob.deadline,
      profileMatching: myJob.profileMatching,
      status: myJob.status,
      userId: myJob.userId,
      createdAt: myJob.createdAt,
      updatedAt: myJob.updatedAt,
    };
  }
}
