# tanstack-cloudflare-template

A template for SSR-ready React applications powered by TanStack Start and Cloudflare Workers.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19)
- **Routing**: [TanStack Router](https://tanstack.com/router) (file-based)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- **Toolchain**: [Vite+](https://viteplus.dev/) (`vp` — Vite, Vitest, Oxlint, Oxfmt)
- **Git Hooks**: Vite+ hooks (`vp staged` / `.vite-hooks`)
- **Package Manager**: pnpm (via `vp install`)

## Prerequisites

- **Node.js**: CI uses 24.19.0 via `setup-vp`. Vite+ also supports current Node 20 / 22 / 24 releases.
- **pnpm**: provided by Vite+; see `packageManager` in `package.json`.
- **Vite+ CLI** (`vp`):

```bash
curl -fsSL https://vite.plus | bash
```

Then open a new shell (or ensure `~/.vite-plus/bin` is on your `PATH`) and run `vp help`.

A Cloudflare account is required only when you deploy.

## Getting started

After you create a repository from this template (or clone it):

```bash
cd tanstack-cloudflare-template
vp install        # Install dependencies
vp run prepare    # Install Git hook dispatcher (also runs via prepare)
vp dev            # Start the Vite+ / Wrangler dev server
```

The app is served at **http://localhost:5173/** (Vite's default). This template does not set `server.port`, so the port is 5173, not 3000.

`package.json` scripts still work through pnpm (`pnpm dev`, `pnpm check`, …) or `vp run <script>`. Prefer the `vp` built-ins above for day-to-day work.

## Commands

```bash
vp install        # Install dependencies
vp run prepare    # Install Git hook dispatcher (also runs via prepare)
vp dev            # Start dev server (http://localhost:5173/)
vp build          # Production build (client + SSR / workerd)
vp preview        # Preview production build
vp run deploy     # Build and deploy to Cloudflare Workers
vp test           # Run tests
vp check          # Format + lint + type-check
vp check --fix    # Autofix format/lint (also type-checks)
vp run cf-typegen # Generate Cloudflare bindings types
```

Test files should import from `vite-plus/test`, not `vitest`. Vitest is provided by `vite-plus` and is not a direct dependency, so `from "vitest"` will not resolve under pnpm.

## Bindings, vars, and secrets

Put non-secret values in `vars` in `wrangler.jsonc`. Do not commit secrets: use [Wrangler secrets](https://developers.cloudflare.com/workers/configuration/secrets/) in production and `.dev.vars` locally (gitignored; see `.gitignore`).

After you change `wrangler.jsonc` (bindings, vars, compatibility flags, or similar), regenerate types:

```bash
vp run cf-typegen
```

This updates `worker-configuration.d.ts`. Commit that file so CI can verify it with `wrangler types --check`.

Access bindings and vars from server-side code:

```ts
import { env } from "cloudflare:workers";

export function getGreeting() {
  return env.MY_VAR;
}
```

See [Cloudflare bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [environment variables](https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables).

## Deploy

1. Log in and confirm the account:

```bash
wrangler login
wrangler whoami
```

2. Deploy:

```bash
vp run deploy
```

This runs the production build, then `wrangler deploy`.

More: [TanStack Start hosting (Cloudflare)](https://tanstack.com/start/latest/docs/framework/react/guide/hosting) and [Cloudflare: TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/).

## Project Structure

```
src/
  routes/         # File-based routing
  router.tsx      # Router configuration
  styles.css      # Global styles
.vite-hooks/      # Project-owned Git hooks (pre-commit)
wrangler.jsonc    # Cloudflare Workers config
vite.config.ts    # Vite+ config (dev/build/lint/fmt/staged/test)
```
