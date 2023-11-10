CREATE TABLE public.jobs (
  job_id SERIAL NOT NULL,
  job_name VARCHAR NOT NULL,
  pid INT NOT NULL,
  executed_at TIMESTAMP NOT NULL DEFAULT now(),
  finished_at TIMESTAMP,
  CONSTRAINT pk_jobs_job_id PRIMARY KEY (job_id)
);

