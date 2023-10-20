CREATE USER owner_user;

CREATE TABLE public.users (
  user_id SERIAL NOT NULL,
  balance INT NOT NULL CHECK (balance >= 0),
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  CONSTRAINT pk_users_user_id PRIMARY KEY (user_id)
);

ALTER TABLE public.users OWNER TO owner_user;

