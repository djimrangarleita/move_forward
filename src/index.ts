import express, { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send({ msg: 'Hello World, from Move Forward' });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});