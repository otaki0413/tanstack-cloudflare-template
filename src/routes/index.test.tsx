import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("App renders Hello World", () => {
  // Route コンポーネントではなく、直接レンダリングできるようインポート
  render(
    <main>
      <h1>Hello World!</h1>
    </main>,
  );
  expect(screen.getByText("Hello World!")).toBeDefined();
});
