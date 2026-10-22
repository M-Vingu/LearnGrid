# LearnGrid progress

Last reviewed: 2026-10-22

## Product direction

LearnGrid needs three dashboards: a student dashboard, a teacher dashboard, and an administrator dashboard for the owner. The user wants to complete and review the frontend before moving on to backend work.

## Frontend now implemented

- Replaced the default Vite starter screen with a responsive, role based LearnGrid dashboard.
- Added a role switcher for Student, Teacher, and Admin, with separate navigation and overview content for each role.
- Added student course cards, learning stats, weekly activity, streak, and study plan.
- Added teacher class and assignment views, engagement stats, student list, and course creation.
- Added administrator platform stats, user management, course management, and analytics views.
- Added search filtering on course views, lightweight forms and modals, course continuation preview, planner interactions, toast feedback, and mobile navigation.
- Updated the page title and metadata. Sample content is local frontend data; no API or persistence is connected yet.
- Fixed the blank development page in `frontend/vite.config.js`: this workspace's `WORLDBO$$` path caused Vite 8.1.2's internal `/@vite/client` and `/@vite/env` aliases to collapse `$$` to `$`. Explicit escaped aliases restore the client modules. Confirmed the dashboard renders in Chrome.

## Project setup

- `frontend/` uses React 19 and Vite. `react-router-dom` is installed, though this prototype switches views with local React state.
- Available scripts, run from `frontend/`: `npm run dev`, `npm run build`, `npm run lint`, and `npm run preview`.
- The workspace root does not appear to be a Git repository.

## Backend foundation started

- Chosen stack: Node.js 24 LTS, TypeScript, Fastify 5, PostgreSQL 18, Drizzle ORM, and Zod. PostgreSQL domain tables are intentionally deferred until the auth and learning data model is agreed.
- Added `backend/` with configuration parsing, API v1 route registration, Helmet security headers, allowlisted CORS, rate limiting, redacted structured logs, generic error responses, PostgreSQL connection pooling, Drizzle migration configuration, and separate liveness/readiness endpoints.
- Added a local Compose database definition and `.env.example`; local database credentials are for loopback development only.
- Backend dependency installation and lockfile are present. Initial verification was completed; PostgreSQL integration checks remain pending. Docker availability should be rechecked when beginning database verification.
- No identity provider, hosting target, or product data model was available; authentication and domain API work remain pending.

## Backend review fixes

- Fixed the Fastify 5 custom error handler type in `backend/src/app.ts` by specifying Fastify's error type. `npm run build` passes.
- Added a built-in Node test for the API liveness endpoint and an `npm test` script. Build, lint, and the test pass.
- Reviewed and pinned install-script approvals for the three installed `esbuild` versions. `npm approve-scripts --allow-scripts-pending` now reports no pending scripts.
- Updated `backend/package.json` and `backend/package-lock.json` through npm to Drizzle ORM `^0.45.4` and stable Drizzle Kit `^0.31.11`. A clean `npm ci` then succeeded (202 packages added).
- Verified installed versions: ORM 0.45.4; Kit 0.31.11; Kit still depends on `@esbuild-kit/esm-loader@2.6.5` and vulnerable `esbuild@0.18.20`, alongside safe esbuild 0.25.12 and 0.28.2. The latest stable Kit release reported by npm is 0.31.11; available newer 1.0 versions are prereleases. The audit's suggested Kit 0.18.1 is a downgrade and was not applied.
- Fresh live `npm audit` after the clean install reports zero high findings and four moderate findings, all along Drizzle Kit's legacy loader path. ORM advisory is resolved. The esbuild advisory affects versions <=0.24.2; this remains a moderate dev-tooling risk, and no stable Kit upgrade currently removes it.
- After clean install, `npm run build`, `npm run lint`, and `npm test` all pass. `npm test` still covers only one liveness smoke test. First `npm ci` attempt failed on a Windows EBUSY lock while removing `fastify-plugin`; retry completed successfully. An attempted build between these installs failed because that partial install had removed TypeScript; it passed after the successful retry.

## Next step

## Phase 2 — Backend verification (in progress)

- Refactored configuration parsing into a pure `parseConfig` function. Added safe handling for malformed database URLs; previously the URL protocol check could throw an uncaught `TypeError` rather than the sanitized configuration error.
- Made the readiness database check injectable for isolated tests and added test-only CORS/rate-limit overrides. Production defaults remain unchanged. Added unit coverage for liveness/readiness success and failure, missing/invalid configuration, request and Zod validation, generic unexpected errors, allowed/denied CORS, rate limiting, redacted secret fields, and SIGINT/SIGTERM shutdown cleanup.
- Added `npm run test:integration`, which requires `LEARNGRID_INTEGRATION_DATABASE_URL`, a disposable DB name ending `_test`, and PostgreSQL 18+. It verifies the actual DB server version, readiness, and that closing the app releases its PostgreSQL pool. The test was skipped because the required DB URL is unavailable.
- Added graceful signal handling in `backend/src/shutdown.ts`; SIGINT/SIGTERM close Fastify and its database pool once. The unit test verifies this wiring using an injected database cleanup callback.
- Confirmed there is no `drizzle/` migration directory or existing migration file. `npm run db:migrate` was attempted; it did not reach migration application and failed inside Drizzle Kit with `uv_os_get_passwd returned ENOMEM`. No database is available to run migration history or repeatability checks.
- Environment checks: `docker --version` reports the command is unavailable; `psql` and `pg_isready` are not installed; `Test-NetConnection 127.0.0.1 -Port 5432` returned `False`. Therefore actual PostgreSQL connectivity, database failure behavior against a server, migration application/history/repeatability, and real pool shutdown remain unverified.
- Latest verification after test changes: `npm run build` passed; `npm test` passed (11 unit tests); `npm run lint` passed; `npm run test:integration` built successfully but reported 1 skipped test because `LEARNGRID_INTEGRATION_DATABASE_URL` is unset. The latest `npm run db:migrate` failed with the Drizzle Kit environment error noted above. No security audit was run in this phase; the last recorded audit from Phase 1 reported 0 high and 4 moderate findings.
- No frontend or Modern Library files were changed. Authentication, authorization, domain schema, and production readiness are still outstanding.

### Phase 2 next steps / blocker

Provide a running PostgreSQL 18 service (preferably disposable test DB named with `_test`) and resolve the Drizzle Kit CLI environment failure. Then rerun the integration test, verify readiness transitions with a real DB outage, create/review the first migration before applying it twice, and confirm the real pool closes on signal. Do not begin identity or learning domain implementation until these verification steps are complete.
