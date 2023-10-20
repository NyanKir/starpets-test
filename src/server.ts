import { App } from '@/app';
import { UsersRouter } from '@/routes/users/route';

import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`рабочий ${worker.process.pid} умер`);
  });
} else {
  new App([new UsersRouter()]).listen();
}
