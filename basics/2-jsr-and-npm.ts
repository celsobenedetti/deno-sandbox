/**
 * import @std library from jsr.io
 */
import { invert } from "jsr:@std/collections";

const someObject = { a: "x", b: "y", c: "z" };

/**
 * Challenge: use a tool from @std/collections to invert the keys and values
 */
function invertKeysAndValues(obj: Record<string, string>) {
  return invert(obj);
}

if (import.meta.main) {
  console.log(
    invertKeysAndValues(someObject),
  );
}
