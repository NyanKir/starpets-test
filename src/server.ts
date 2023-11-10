import { App } from '@/app';

import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';
import { UsersRouter } from '@/routes/users/users.route';
import { JobsRouter } from '@/routes/users/jobs.route';
import { JobsService } from '@/services/jobs.service';
import { jobsRepository } from '@/repository/jobs.repository';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary pid ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const handle = async () => {
    console.log(`Worker ${process.pid} died`);
    await jobsRepository.finishJobByPID(process.pid);
  };

  process.on('SIGINT', handle);
  process.on('exit', handle);

  new App([new UsersRouter(), new JobsRouter()]).listen(() => {
    void new JobsService(cluster.worker.id, numCPUs).run();
  });
}
