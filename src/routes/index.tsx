import { createFileRoute } from "@tanstack/react-router";

import { getGreeting } from "@/server/greeting";

export const Route = createFileRoute("/")({
  loader: () => getGreeting(),
  component: App,
});

function App() {
  const greeting = Route.useLoaderData();

  return (
    <main className="grid min-h-screen place-items-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Hello World!</h1>
        <p className="mt-4 text-lg text-gray-600">{greeting}</p>
      </div>
    </main>
  );
}
