// @ts-nocheck workers don't have types yet

function fibonnaci(num: number) {
  if (num <= 1) return num;
  return fibonnaci(num - 1) + fibonnaci(num - 2);
}

self.onmessage = (e) => {
  const { n } = e.data;
  const result = fibonnaci(n);

  // Send result back to main thread
  self.postMessage(result);
};
