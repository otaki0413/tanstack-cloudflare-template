<!-- prettier-ignore-start -->
<!-- intent-skills:start -->
## Skill Loading

Use the repository’s installed Intent. If it is unavailable, report the missing dependency instead of downloading a replacement.
Before editing files for a substantial task:
- Run `pnpm exec intent list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `pnpm exec intent load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->
<!-- prettier-ignore-end -->

When a loaded skill disagrees with this template, follow this template, especially the `vp` CLI such as `vp run deploy` and `vp run cf-typegen`, the Node.js version floors, and the pnpm release-age policy.

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

- `vp test` / `pnpm test` uses Vitest and runs `*.test.ts(x)` files such as
  `tests/routes/index.test.tsx` (`passWithNoTests: true` keeps it green if none
  exist). Import `test` / `expect` from `vite-plus/test`, not `vitest`. `vp build` builds both the client and SSR (workerd) bundles.
