export type CreateJobDto = {
  title: string;
  reference: string;
  company: string;
  deadline?: Date;
  keywords?: string;
  description?: string;
  status?: string;
};
