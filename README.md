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

The backend expects a few environment variables in `apps/backend/.env` - see `apps/backend/.env.example` for the full list:

```
DATABASE_URL="postgresql://scripthub:scripthub@localhost:5432/scripthub?schema=public"
FRONTEND_URL="http://localhost:5173"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_CALLBACK_URL="http://localhost:3000/auth/google/callback"
JWT_SECRET=""
```

`GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` come from an OAuth 2.0 Client ID created in the
[Google Cloud Console](https://console.cloud.google.com/apis/credentials); add
`GOOGLE_CALLBACK_URL`'s value as an authorized redirect URI on that client. `JWT_SECRET` signs
session cookies - generate one with `openssl rand -hex 32`.

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

| Command             | Description                       |
| ------------------- | --------------------------------- |
| `pnpm dev`          | Run backend and frontend together |
| `pnpm lint`         | Lint all packages                 |
| `pnpm lint:fix`     | Lint and autofix all packages     |
| `pnpm format`       | Format the repo with Prettier     |
| `pnpm format:check` | Check formatting without writing  |

Each app also has its own scripts — see `apps/backend/package.json` and `apps/frontend/package.json` (e.g. `pnpm --filter backend test`, `pnpm --filter frontend build`).

## Authentication

Users sign in with Google. `GET /auth/google` redirects to Google's consent screen; on
success `GET /auth/google/callback` exchanges the authorization code, finds or creates the
matching `User` (defaulting new users to the `runner` role), and sets an httpOnly session
cookie before redirecting back to the frontend. `GET /auth/me` returns the current user, and
`POST /auth/logout` clears the cookie. All other routes require a valid session by default;
mark a route `@Public()` (see `apps/backend/src/auth/decorators/public.decorator.ts`) to opt
out. Role/permission enforcement itself is a later milestone (see `Specifications/PRD.docx`).
