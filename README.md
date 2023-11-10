## Available routes in postman folder
```
$ POST /users - create
$ POST /users/balance - update balance
$ GET /jobs - get unfinished jobs
```
## Quick start
To switch between different version of nodesjs. You can use the utility:
https://github.com/nvm-sh/nvm
```bash
$ nvm use
$ pnpm install
```
Create `.env` file, from example `.env.template`.

## Scripts and how to run

```bash
# watch mode
$ pnpm run dev

# production mode
$ pnpm run build
$ pnpm run start

# migrations
$ pnpm run migrate
$ pnpm run migrate:undo
```
