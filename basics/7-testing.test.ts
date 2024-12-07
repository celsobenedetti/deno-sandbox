import { expect } from "jsr:@std/expect";
import {
  assertEquals,
  assertExists,
  assertGreater,
  assertMatch,
  assertNotMatch,
} from "@std/assert";
import { multiply } from "./7-testing.ts";

Deno.test(function multiplyTest() {
  assertEquals(multiply(2, 2), 4);
  assertEquals(multiply(2, 3), 6);
});

Deno.test("multply test", () => {
  expect(multiply(2, 3)).toBe(6);
});

Deno.test("mock API call", async () => {
  const mockApi = () => Promise.resolve("mock data");
  const result = await mockApi();
  expect(result).toBe("mock data");
});

Deno.test("databasd lib", async (t) => {
  const db = new Map();

  await t.step("db exists", () => {
    assertExists(db);
  });

  await t.step("insert user", () => {
    db.set("user", "celso");

    assertGreater(db.size, 0);
    assertMatch(db.get("user"), /celso/);
    assertNotMatch(db.get("user"), /sonin bleinin/);
  });
});
