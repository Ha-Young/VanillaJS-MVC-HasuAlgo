export function waitFor(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}