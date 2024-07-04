export type CreateMyJobDto = {
  title: string;
  company: string;
  reference?: string;
  deadline?: Date;
  keywords?: string;
  description?: string;
  status?: string;
  userId: string;
};

export interface MyJobDto {
  id: string;
  title: string;
  company: string;
  reference?: string;
  deadline?: Date;
  keywords?: string;
  description?: string;
  status?: string;
  profileMatching: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMyJob {
  findAll(filter?: object): Promise<Array<MyJobDto | null>>;
  create(myJob: CreateMyJobDto): Promise<MyJobDto | null>;
  findOneById(id: string, userId?: string): Promise<MyJobDto | null>;
  update(
    id: string,
    myJob: Omit<Partial<MyJobDto>, 'id'>,
    userId?: string
  ): Promise<MyJobDto | null>;
  delete(id: string, userId?: string): Promise<void>;
}
