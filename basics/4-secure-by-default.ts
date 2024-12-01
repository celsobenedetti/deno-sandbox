/**
 * Deno will need explicit permissions to read this file
 */
await Deno.readFile("./README.md");
// deno run --allow-read ./basics/4-secure-by-default.ts
// or "allow all"
// deno run -A ./basics/4-secure-by-default.ts
