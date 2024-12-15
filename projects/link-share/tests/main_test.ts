import { assertEquals, assertNotEquals, assertRejects } from "@std/assert";
import server from "../src/main.ts";
import { generateShortCode } from "../src/db.ts";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const exampleUrl = "https://www.example.com";

Deno.test(async function serverFetch() {
  const req = new Request("https://deno.land");
  const res = await server.fetch(req);
  assertEquals(await res.text(), "Hello, World!");
});

Deno.test(async function serverFetchNotFound() {
  const req = new Request("https://deno.land/404");
  const res = await server.fetch(req);
  assertEquals(res.status, 404);
});

Deno.test(async function serverFetchUsers() {
  const req = new Request("https://deno.land/users/123");
  const res = await server.fetch(req);
  assertEquals(await res.text(), "123");
});

Deno.test("URL shortener", async (t) => {
  await t.step("should contain 12 characters", async () => {
    const got = await generateShortCode(exampleUrl);
    assertEquals(got.length, 12);
  });

  await t.step(
    "should be unique for each timestamp",
    async () => {
      const a = await generateShortCode(exampleUrl);
      await delay(5);
      const b = await generateShortCode(exampleUrl);
      assertNotEquals(a, b);
    },
  );

  await t.step("should throw on invalid url", () => {
    assertRejects(async () => {
      await generateShortCode("htsa//exal.com");
    });
  });
});
