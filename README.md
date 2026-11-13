# Dark Bay

NestJS API for auctions, offers and users, with Postgres (TypeORM) and JWT login.

## Requirements

- Node 24 (see `.nvmrc`)
- pnpm (`brew install pnpm`)
- A Postgres database

## Setup

```bash
pnpm install
cp .env.example .env
```

Set `POSTGRES_URL` and `JWT_SECRET` in `.env`. The tables are created on start (`synchronize: true`), and `pnpm db:seed` fills them with sample data.

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
