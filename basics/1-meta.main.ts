// A file can have exports as well as a "main" function
export function helloWorld() {
  console.log("Hello, World!");
}

// This will only be true if this file is directly run from Deno CLI
if (import.meta.main) {
  helloWorld();
}
