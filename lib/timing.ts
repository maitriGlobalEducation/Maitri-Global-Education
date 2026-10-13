export function logTiming(label: string, start: number) {
  console.log(`[TIMING] ${label}: ${Date.now() - start}ms`);
}
