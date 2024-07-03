import { Router } from 'express';
import * as myJob from './my_job.controller';

const myJobRoute = Router();

myJobRoute.get('/', myJob.getCollection);

myJobRoute.post('/', myJob.create);

myJobRoute.get('/:id', myJob.getItem);

myJobRoute.patch('/:id', myJob.update);

myJobRoute.delete('/:id', myJob.deleteItem);

export default myJobRoute;
