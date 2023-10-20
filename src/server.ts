import { App } from '@/app';
import { UsersRouter } from '@/routes/users/route';

new App([new UsersRouter()]).listen();
