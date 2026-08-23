# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service app: a TanStack Start (React 19) SSR application that runs on
Cloudflare Workers, built with Vite. Standard commands live in `package.json` `scripts`
and are documented in `README.md` (`pnpm dev`, `pnpm build`, `pnpm test`, `pnpm lint`,
`pnpm fmt`, `pnpm check`). Prefer those over reinventing commands.

Non-obvious caveats for this environment:

- Node version: `oxlint` and `oxfmt` load `*.config.ts` files and require Node
  `^20.19.0 || >=22.18.0`. The default `/exec-daemon/node` is v22.14.0, which is too old
  and makes `pnpm lint` / `pnpm fmt` / `pnpm check` fail with an "Unknown file extension
  .ts" error. During setup, nvm's default was set to Node 22 (v22.23.2) and `~/.bashrc`
  prepends that nvm bin to `PATH` so new shells use it automatically. If a command ever
  reports the old Node version, run `nvm use default` (or start a fresh shell).

- `lefthook install` is expected to fail here. The project `postinstall` runs
  `lefthook install`, but Cursor manages git hooks via a custom `core.hooksPath`, which
  lefthook refuses to override. This is benign for development (it only affects local git
  hooks). The startup update script therefore installs with `--ignore-scripts` and then
  runs `pnpm rebuild` for the native build deps, avoiding the failing root postinstall
  while still building `esbuild`/`workerd`/`sharp`. Do not "fix" this by forcing lefthook
  into Cursor's hooks path.

- Dev server: `pnpm dev` serves on `http://localhost:5173/` (Vite default), not 3000.
  It renders SSR HTML directly (curling `/` returns "Hello World!"). Unknown routes render
  the custom 404 component from `src/routes/__root.tsx`.

- `pnpm test` uses Vitest with `passWithNoTests: true`, so it currently exits 0 with no
  test files. `pnpm build` builds both the client and SSR (workerd) bundles.
