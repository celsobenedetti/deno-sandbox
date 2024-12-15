// deno-lint-ignore-file require-await
import { serveDir } from "@std/http";
import { Router } from "./router.ts";

const router = new Router();
router.get("/", async () => new Response("Hello, World!"));
router.get("/static/*", async (req) => serveDir(req));
router.get(
  "/users/:id",
  async (_req, match) => new Response(match.pathname.groups.id),
);

export default {
  fetch(req, info?) {
    return router.handle(req, info);
  },
} satisfies Deno.ServeDefaultExport;
