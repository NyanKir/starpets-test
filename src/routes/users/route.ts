import { Routes } from '@/declarations/route';
import { Router } from 'express';
import { IController, UsersController } from '@/routes/users/controller';

export class UsersRouter implements Routes {
  path: string = '/users';
  router: Router = Router();
  controller = new UsersController();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      `${this.path}`,
      this.controller.createUser.bind(this.controller)
    );
    this.router.post(
      `${this.path}/balance`,
      this.controller.updateBalance.bind(this.controller)
    );
  }
}
