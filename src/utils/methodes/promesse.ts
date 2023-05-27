export function delay(duration: number) {
  return new Promise((r) => setTimeout(r, duration));
}
