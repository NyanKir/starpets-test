import process from 'node:process';
import { Jobs } from '@/models/jobs';
import { IMyJob, MyJob } from '@/common/my-job';
import { CronExpression } from '@/enums/cron-expression.enum';

interface IJobsService {
  readonly jobs: IMyJob[];

  run(): void;
}

export class JobsService implements IJobsService {
  jobs: Array<IMyJob>;

  constructor(
    readonly id: number,
    readonly countWorker: number
  ) {
    this.jobs = [
      new MyJob('Throw In the Towel', CronExpression.EVERY_2_MINUTE),
      new MyJob('A Hundred and Ten Percent', CronExpression.EVERY_2_MINUTE),
      new MyJob('A Home Bird', CronExpression.EVERY_2_MINUTE),
      new MyJob(
        'Every Cloud Has a Silver Lining',
        CronExpression.EVERY_2_MINUTE
      ),
      new MyJob('Jumping the Gun', CronExpression.EVERY_2_MINUTE),
      new MyJob('Back To the Drawing Board', CronExpression.EVERY_2_MINUTE),
      new MyJob('A Chip on Your Shoulder', CronExpression.EVERY_2_MINUTE),
      new MyJob('Long In The Tooth', CronExpression.EVERY_2_MINUTE),
      new MyJob('Plot Thickens - The', CronExpression.EVERY_2_MINUTE),
      new MyJob('Par For the Course', CronExpression.EVERY_2_MINUTE),
      new MyJob('Knock Your Socks Off', CronExpression.EVERY_2_MINUTE),
      new MyJob('Lickety Split', CronExpression.EVERY_2_MINUTE)
    ];
  }

  getSlices(array: Array<IMyJob>, n: number) {
    let [...arr] = array;
    const res: Array<Array<IMyJob>> = [];
    while (arr.length) {
      res.push(arr.splice(0, n));
    }
    return res;
  }

  async run() {
    const avg = this.jobs.length / this.countWorker;
    const countPieces = Math.round(avg < 1 ? 1 : avg);
    const slices = this.getSlices(this.jobs, countPieces);
    const jobs = slices[this.id - 1];
    if (jobs) {
      for (const job of jobs) {
        console.log(`Job: ${job.name} run by, pid ${process.pid}`);
        job.start();
      }
      await Jobs.bulkCreate(
        jobs.map((job) => ({
          job_name: job.name,
          pid: process.pid
        }))
      );
    }
  }
}
