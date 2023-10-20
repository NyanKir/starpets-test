import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { PORT } = process.env;
