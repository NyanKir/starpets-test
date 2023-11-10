import { IJobs, Jobs } from '@/models/jobs';
import { Op } from 'sequelize';

export interface IJobsRepository {
  getNotFinished(): Promise<IJobs[]>;

  finishJobByPID(pid: number): Promise<boolean>;

  finishJobs(): Promise<boolean>;
}

export class JobsRepository implements IJobsRepository {
  constructor(readonly entity: typeof Jobs) {}

  public async getNotFinished() {
    return this.entity.findAll({
      where: {
        finished_at: {
          [Op.is]: null
        }
      }
    });
  }

  public async finishJobByPID(pid: number) {
    await Jobs.update(
      {
        finished_at: new Date()
      },
      {
        where: {
          pid
        }
      }
    );
    return true;
  }

  public async finishJobs() {
    await Jobs.update(
      {
        finished_at: new Date()
      },
      {
        where: {
          finished_at: {
            [Op.is]: null
          }
        }
      }
    );
    return true;
  }
}

export const jobsRepository = new JobsRepository(Jobs);
