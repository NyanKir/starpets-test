import { CronJob } from 'cron';
import { sequelize } from '@/models';
import { Jobs } from '@/models/jobs';
import process from 'node:process';
import { delay } from '@/utils';

export interface IMyJob extends CronJob {
  readonly name: string;
}

type Constructor = ConstructorParameters<typeof CronJob>;

export class MyJob extends CronJob implements IMyJob {
  constructor(
    readonly name: string,
    tick: Constructor[0]
  ) {
    super(tick, async () => {
      try {
        await this.task();
      } catch (e) {
        console.error(e);
      }
    });
  }

  private async task() {
    await delay(120 * 1000);
    const t = await sequelize.transaction();
    console.log(`Job's done: ${this.name} by pid ${process.pid}`);

    try {
      await Jobs.update(
        {
          finished_at: new Date()
        },
        {
          where: {
            job_name: this.name,
            pid: process.pid
          },
          transaction: t
        }
      );

      await Jobs.create(
        {
          job_name: this.name,
          pid: process.pid
        },
        {
          transaction: t
        }
      );

      await t.commit();
    } catch (error) {
      console.error(`Rollback failed`, error);
      await t.rollback();
    }
  }
}
