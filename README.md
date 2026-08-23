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

Install the Vite+ CLI once:

```bash
curl -fsSL https://vite.plus | bash
```

Then open a new shell (or ensure `~/.vite-plus/bin` is on your `PATH`) and run `vp help`.

## Development

```bash
vp install        # Install dependencies
vp run prepare    # Install Git hook dispatcher (also runs via prepare)
vp dev            # Start dev server
vp build          # Production build
vp preview        # Preview production build
vp run deploy     # Deploy to Cloudflare Workers
vp test           # Run tests
vp check          # Format + lint + type-check
vp check --fix    # Autofix format/lint (also type-checks)
vp run cf-typegen # Generate Cloudflare bindings types
```

`package.json` scripts still work through pnpm (`pnpm dev`, `pnpm check`, …) or `vp run <script>`. Prefer the `vp` built-ins above for day-to-day work.

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
