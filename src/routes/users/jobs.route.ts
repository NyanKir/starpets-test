import { Router } from 'express';
import { Routes } from '@/declarations/route';
import {
  ValidationMiddleware,
  ValidationSource
} from '@middlewares/validation.middleware';
import { UsersController } from '@/controllers/users.controller';
import { updateBalanceSchema } from '@/controllers/users.schema';
import { UsersService } from '@/services/users.service';
import { JobsController } from '@/controllers/jobs.controller';
import { jobsRepository } from '@/repository/jobs.repository';

export class JobsRouter implements Routes {
  path: string = '/jobs';
  router: Router = Router();
  controller = new JobsController(jobsRepository);

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}`,
      this.controller.getJobs.bind(this.controller)
    );
  }
}
