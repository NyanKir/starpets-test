import { PORT } from '@config';
import express, { Express } from 'express';
import cors from 'cors';

import 'models';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { Routes } from '@/declarations/route';

export class App {
  private app: Express;
  private readonly port: number;

  constructor(routes: Routes[] = []) {
    this.app = express();
    this.port = Number(PORT);

    this.initMiddlewares();
    this.initRoutes(routes);
  }

  public listen(callback: () => void) {
    const server = this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at http://localhost:${this.port}, pid: ${process.pid}`
      );
      callback();
    });

    server.on('close', () => {
      console.log(
        `⚡️[server]: Server is closed at http://localhost:${this.port}, pid: ${process.pid}`
      );
    });

    return server;
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initRoutes(routes: Routes[] = []) {
    this.app.get('/', (req, res) => res.sendStatus(200));

    routes.forEach((route) => {
      this.app.use('/', route.router);
    });

    this.app.use(ErrorMiddleware);
  }
}
