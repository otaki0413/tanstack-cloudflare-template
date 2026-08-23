# AGENTS.md

## Cursor Cloud specific instructions

This is a single-service app: a TanStack Start (React 19) SSR application that runs on
Cloudflare Workers, built with Vite+ (`vp`). Prefer the `vp` built-ins documented in
`README.md` (`vp install`, `vp dev`, `vp build`, `vp test`, `vp check`).
`package.json` scripts still work via `pnpm <script>` or `vp run <script>`.

Non-obvious caveats for this environment:

- Node / `vp` on PATH: ensure `~/.vite-plus/bin` is available (install with
  `curl -fsSL https://vite.plus | bash`). The default `/exec-daemon/node` is v22.14.0,
  which is too old for some tooling; nvm's default is Node 22 (v22.23.2) and
  `~/.bashrc` prepends that nvm bin (and Vite+ bin) to `PATH`. If a command reports
  the old Node version, run `nvm use default` (or start a fresh shell). Project CI
  uses Node 24.19.0 via `setup-vp`.

- Git hooks: the project uses Vite+ hooks (`.vite-hooks/` + `prepare: vp config`).
  Cursor manages `core.hooksPath` via a custom agent-hooks path, so `vp hooks enable`
  / `vp config` may leave that path unchanged here. That is benign for Cloud Agents
  (hooks still work for normal local clones). Do not force-overwrite Cursor's
  `core.hooksPath`. Startup install may use `--ignore-scripts` then `pnpm rebuild`
  for native deps (`esbuild` / `workerd` / `sharp`) if lifecycle scripts are noisy.

- Dev server: `vp dev` (or `pnpm dev`) serves on `http://localhost:5173/` (Vite
  default), not 3000. It renders SSR HTML directly (curling `/` returns
  "Hello World!"). Unknown routes render the custom 404 component from
  `src/routes/__root.tsx`.

- `vp test` / `pnpm test` uses Vitest with `passWithNoTests: true`, so it currently
  exits 0 with no test files. Import `test` / `expect` from `vite-plus/test`, not
  `vitest`. `vp build` builds both the client and SSR (workerd) bundles.
