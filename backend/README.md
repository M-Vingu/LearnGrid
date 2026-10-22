# LearnGrid API

The backend foundation uses Fastify 5, TypeScript, PostgreSQL 18, Drizzle ORM, and Zod. It is kept separate from the Vite frontend.

## Requirements

- Node.js 24 LTS
- Docker with Compose (for the local PostgreSQL service)

## Local setup

1. Copy `.env.example` to `.env`.
2. Start the database with `docker compose up -d database`.
3. Install dependencies with `npm install`.
4. Start the API with `npm run dev`.

Run `npm test` for unit tests, `npm run test:integration` for real PostgreSQL integration tests, `npm run lint` for static checks, and `npm run build` to compile TypeScript. Integration tests require `LEARNGRID_INTEGRATION_DATABASE_URL` pointing to a disposable PostgreSQL 18 database whose name ends in `_test`; this guard prevents tests from running against an ordinary development or production database.

The API listens on `http://127.0.0.1:3000` by default. `GET /api/v1/health/live` checks process liveness; `GET /api/v1/health/ready` checks database readiness.

## Database changes

Domain tables and migrations will be added alongside the authentication and learning data model. There are currently no committed migration files, so no schema migration can be applied yet. Use `npm run db:generate` to generate a reviewed SQL migration and `npm run db:migrate` to apply committed migrations once they exist. Never run schema push commands against production.

## Current scope

This is infrastructure only. It does not yet implement authentication, users, courses, assignments, or frontend API integration. Those contracts should be designed before adding domain schema or endpoints.
