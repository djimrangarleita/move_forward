import { Express } from 'express-serve-static-core';
import { startApp } from './run';

const app: Express = startApp();

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});