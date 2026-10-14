import { RouterProvider, createMemoryHistory } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import { expect, test, vi } from "vite-plus/test";

import { getRouter } from "@/router";

// Server functions need the Start/Workers runtime, so stub the one the loader calls.
vi.mock("@/server/greeting", () => ({
  getGreeting: () => Promise.resolve("Hello from the test!"),
}));

test("index route renders the heading and the loader greeting", async () => {
  const router = getRouter();
  router.update({ history: createMemoryHistory({ initialEntries: ["/"] }) });
  await router.load();

  const html = renderToString(<RouterProvider router={router} />);
  expect(html).toContain("Hello World!");
  expect(html).toContain("Hello from the test!");
});
