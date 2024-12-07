/**
 * @module CLI demo project

 --- Compile ---
 deno compile --allow-ffi -o .bin/cli projects/cli/main.ts
 */

import { yellow } from "jsr:@std/internal@^1.0.5/styles";
import { parseArgs } from "jsr:@std/cli/parse-args";
console.log(Deno.args);

const flags = parseArgs(Deno.args, {
  boolean: ["snake", "kebab"],
  string: ["text"],
  default: { text: "Hello, World!" },
});

const age = prompt("How old are you?");

if (parseInt(age!) < 21) {
  console.log("You are not old enough to run this command");
  Deno.exit();
}

const shouldProceed = confirm("Wait, r u sure?");
if (!shouldProceed) {
  console.log("Getting TFO");
  Deno.exit();
}

console.log();
console.log(yellow(flags.text.toUpperCase()));
