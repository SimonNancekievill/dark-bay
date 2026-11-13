# Dark Bay

NestJS API for auctions, offers and users, with Postgres (TypeORM) and JWT login.

## Requirements

- Node 24 (see `.nvmrc`)
- pnpm (`brew install pnpm`)
- Docker, for the local Postgres database (or any other Postgres)

## Setup

```bash
pnpm install
cp .env.example .env
```

`.env.example` already points to the local Docker database below. For another Postgres, change `POSTGRES_URL` in `.env`. The tables are created on start (`synchronize: true`), and `pnpm db:seed` fills them with sample data.

## Database

Create and start a local Postgres once (port 5433, so it doesn't clash with other Postgres instances on 5432):

```bash
docker run -d --name dark-bay-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=dark-bay -p 5433:5432 -v dark-bay-db:/var/lib/postgresql postgres:18
```

Later, start and stop it with `docker start dark-bay-db` and `docker stop dark-bay-db`. To delete it with all data: `docker rm -f dark-bay-db && docker volume rm dark-bay-db`.

## Run

```bash
pnpm dev
```

- API at http://localhost:3030
- Swagger docs at http://localhost:3030/api
- Bruno requests in `bruno/` (environments `local` and `render`)

## Scripts

```bash
pnpm dev           # start with watch mode
pnpm build         # compile to dist/
pnpm start:prod    # run dist/main
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with auto-fix
pnpm format        # Prettier, write
pnpm format:check  # Prettier, check only
pnpm typecheck     # tsc
pnpm check         # lint + format:check + typecheck
pnpm test          # Vitest unit tests
pnpm test:e2e      # e2e tests, need POSTGRES_URL and JWT_SECRET
pnpm db:seed       # insert sample data
pnpm sync          # switch to main, pull, install dependencies
pnpm sync:branch   # merge main into the current branch (without committing), install dependencies
```

## Deployment (Render)

- Build command: `pnpm install --frozen-lockfile && pnpm build`
- Start command: `pnpm start:prod`
