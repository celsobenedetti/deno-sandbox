// deno run --env --allow-env basics/5-env-variables.ts
const msg = Deno.env.get("HELLO_MESSAGE");

console.log("Message:", msg);
