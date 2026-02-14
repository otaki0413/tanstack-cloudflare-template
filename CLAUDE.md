# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fullstack React application template deployed on Cloudflare Workers. Uses React 19 + TanStack Start (SSR) + TanStack Router (file-based routing) + Tailwind CSS v4.

## Commands

```bash
pnpm dev              # Start dev server with HMR
pnpm build            # Production build (client + server)
pnpm test             # Run all tests once (vitest run)
pnpm check            # Lint (type-aware) + format check
pnpm lint             # Oxlint only
pnpm lint:fix         # Auto-fix lint issues
pnpm fmt:fix          # Auto-format with Oxfmt
pnpm deploy           # Build + deploy to Cloudflare Workers
pnpm cf-typegen       # Generate Cloudflare bindings types (wrangler types)
```

To run a single test file:

```bash
pnpm vitest run src/routes/index.test.tsx
```

## Architecture

- **SSR on Cloudflare Workers**: Vite builds both client (`dist/client/`) and server (`dist/server/`) bundles. The server entry is provided by `@tanstack/react-start/server-entry` and runs as a Cloudflare Worker.
- **File-based routing**: Files in `src/routes/` are auto-discovered by TanStack Router. Adding a file like `src/routes/about.tsx` with `createFileRoute("/about")` automatically registers the route.
- **`src/routeTree.gen.ts`**: Auto-generated route tree — never edit manually.
- **Root layout** (`src/routes/__root.tsx`): Defines the HTML document shell, meta tags, and includes TanStack Router Devtools.
- **Router factory** (`src/router.tsx`): Creates the router instance, one of the few files allowed to use default exports.
- **Path alias**: `@/*` maps to `./src/*`.

## Code Quality Tools

- **Oxlint** (not ESLint): Rust-based linter with `react`, `react-perf`, `import`, `jsx-a11y`, `promise` plugins. Uses `--type-aware --type-check` in CI.
- **Oxfmt** (not Prettier): Rust-based formatter that also sorts imports and Tailwind classes.
- **Lefthook**: Pre-commit runs lint + format on staged files. Pre-push runs full `pnpm check`.
- **Linting rule**: `no-default-export` is enforced globally. Exceptions: `src/router.tsx`, `vite.config.ts`, `vitest.config.ts`.

## Testing

- **Vitest** with jsdom environment.
- **React Testing Library** for component tests.
- Test files live alongside source files (e.g., `src/routes/index.test.tsx`).

## Tech Stack Versions

- Node.js 24, pnpm 10 (managed via mise)
- TypeScript 5.9 with strict mode
- Wrangler with `nodejs_compat` flag enabled
