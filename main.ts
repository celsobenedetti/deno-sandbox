export function add(a: number, b: number) {
  return a + b;
}

// Only true if this file is run directly from Deno cli
// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  add(1, 2);
}
