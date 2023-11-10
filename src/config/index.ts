import * as process from 'process';

import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

assert(process.env.PORT, 'PORT not found');

export const { PORT } = process.env;
