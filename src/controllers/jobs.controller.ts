import { RouteHandle } from '@/declarations/route';
import { Request, Response } from 'express';
import { IJobsRepository } from '@/repository/jobs.repository';

export interface IController {
  getJobs: RouteHandle<void>;
}

export class JobsController implements IController {
  constructor(readonly repository: IJobsRepository) {}

  async getJobs(req: Request, res: Response): Promise<void> {
    const jobs = await this.repository.getNotFinished();
    res.send(jobs);
  }
}
