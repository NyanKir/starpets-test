import { Router } from 'express';
import { Routes } from '../../declarations/route';
import { UsersController } from './controller';
import { UsersService } from './service';
import {
  ValidationMiddleware,
  ValidationSource
} from '../../middlewares/validation.middleware';
import { updateBalanceSchema } from './users.schema';

export class UsersRouter implements Routes {
  path: string = '/users';
  router: Router = Router();
  controller = new UsersController(new UsersService());

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
      ValidationMiddleware(updateBalanceSchema, ValidationSource.BODY),
      this.controller.updateBalance.bind(this.controller)
    );
  }
}
