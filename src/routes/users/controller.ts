import { RouteHandle } from '@/declarations/route';
import { Request, Response } from 'express';

export interface IController {
  updateBalance: RouteHandle<void>;
  createUser: RouteHandle<void>;
}

export class UsersController implements IController {
  constructor() {}

  async updateBalance(req: Request, res: Response): Promise<void> {
    res.send('Hello World!');
  }

  async createUser(req: Request, res: Response): Promise<void> {
    res.send('Hello World!');
  }
}
