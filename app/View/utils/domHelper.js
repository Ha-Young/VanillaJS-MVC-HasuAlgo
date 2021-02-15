/**
 * querySelector wrapper
 *
 * @param {String} selector - A selector for query
 * @param {Element} scope - Optional element for selector
 */
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}
