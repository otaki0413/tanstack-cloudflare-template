import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";

// Reads the `GREETING` var from wrangler.jsonc on the server.
export const getGreeting = createServerFn({ method: "GET" }).handler(() => {
  return env.GREETING;
});
