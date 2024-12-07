/**
 * Calculate fibonnachi in new thread
 */
function calculateFibonnaci(
  n: number,
  opts: { label: string } = { label: "" },
) {
  const worker = new Worker(
    new URL("./worker.ts", import.meta.url).href,
    {
      type: "module",
    },
  );

  worker.postMessage({ n });

  worker.onmessage = (e) => {
    console.log(`WORKER ${opts.label}: result: `, e.data);
    worker.terminate();
  };
}

const numbers = [1000, 1000, 1000, 1000, 1000, 1000];

numbers.forEach((n, i) => {
  calculateFibonnaci(n, { label: i });
});
