import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: {
    ignorePatterns: ["**/routeTree.gen.ts", "worker-configuration.d.ts"],
    sortImports: {
      groups: [
        ["side_effect"],
        ["builtin"],
        ["external"],
        ["internal"],
        ["parent"],
        ["sibling"],
        ["index"],
        ["type"],
      ],
    },
    sortTailwindcss: {
      stylesheet: "./src/styles.css",
      attributes: ["className"],
    },
    sortPackageJson: {
      sortScripts: true,
    },
  },
  lint: {
    ignorePatterns: ["**/routeTree.gen.ts"],
    plugins: ["react", "react-perf", "import", "jsx-a11y", "promise"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    env: {
      node: true,
      browser: true,
    },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      {
        files: ["src/router.tsx", "*.config.ts"],
        rules: {
          "no-default-export": "off",
        },
      },
    ],
  },
  staged: {
    "*.{js,jsx,ts,tsx,json,css}": "vp check --fix",
  },
  plugins: lazyPlugins(() =>
    process.env.VITEST
      ? [viteReact()]
      : [
          devtools(),
          cloudflare({ viteEnvironment: { name: "ssr" } }),
          tailwindcss(),
          tanstackStart(),
          viteReact(),
        ],
  ),
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    passWithNoTests: true,
  },
});
