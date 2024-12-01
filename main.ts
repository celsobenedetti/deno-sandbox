import { toCamelCase } from "jsr:@std/text";

function hello(text: string) {
  console.log(toCamelCase(text));
}

// Only true if this file is run directly from Deno cli
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  hello("Hello, world!");
}
