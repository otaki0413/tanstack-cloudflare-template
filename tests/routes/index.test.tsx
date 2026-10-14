import { renderToString } from "react-dom/server";
import { expect, test } from "vite-plus/test";

import { Route } from "@/routes/index";

test("index route renders the greeting", () => {
  const Component = Route.options.component;
  expect(Component).toBeDefined();

  const html = renderToString(Component ? <Component /> : null);
  expect(html).toContain("Hello World!");
});
