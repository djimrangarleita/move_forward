import express from "express";
import { Express, Request, Response } from "express-serve-static-core";

export function startApp() {
    const app: Express = express();

    app.get('/', (req: Request, res: Response) => {
        res.send({ msg: 'Hello World, from Move Forward' });
    });

    return app;
}