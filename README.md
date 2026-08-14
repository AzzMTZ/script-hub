# Script Hub

A hub for managing, running, and sharing scripts and their configuration, with a history of past runs.

## Stack

- **Backend** — [NestJS](https://nestjs.com/) + [Prisma](https://www.prisma.io/) on PostgreSQL (`apps/backend`)
- **Frontend** — [React](https://react.dev/) + [Vite](https://vite.dev/) + [MUI](https://mui.com/) (`apps/frontend`)
- **Shared types** — `@script-hub/types` (`packages/types`), consumed by both apps
- **Monorepo tooling** — [pnpm workspaces](https://pnpm.io/workspaces)

## Project structure

```
apps/
  backend/    NestJS API (scripts, config-items, runs, users)
  frontend/   React app
packages/
  types/      Shared TypeScript types
Specifications/  PRD, TDD, and UI/UX docs
docker-compose.yml  Local PostgreSQL
```

## Getting started

### Prerequisites

- Node.js
- [pnpm](https://pnpm.io/installation)
- Docker (for local PostgreSQL)

### Setup

```bash
pnpm install
docker compose up -d
```

The backend expects a `DATABASE_URL` in `apps/backend/.env`, pointing at the database started above:

```
DATABASE_URL="postgresql://scripthub:scripthub@localhost:5432/scripthub?schema=public"
```

Apply the Prisma schema:

```bash
pnpm --filter backend exec prisma migrate deploy
```

### Run in development

```bash
pnpm dev
```

This starts the backend (`start:dev`) and frontend (`dev`) concurrently.

## Scripts

Run from the repo root:

| Command | Description |
| --- | --- |
| `pnpm dev` | Run backend and frontend together |
| `pnpm lint` | Lint all packages |
| `pnpm lint:fix` | Lint and autofix all packages |
| `pnpm format` | Format the repo with Prettier |
| `pnpm format:check` | Check formatting without writing |

Each app also has its own scripts — see `apps/backend/package.json` and `apps/frontend/package.json` (e.g. `pnpm --filter backend test`, `pnpm --filter frontend build`).
