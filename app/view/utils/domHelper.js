/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}

/**
 * querySelectorAll wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function qsAll(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}

/**
 * getElementsByClassName wrapper
 *
 * @param {string} className Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function getByClassName(selector, scope) {
	return (scope || document).getElementsByClassName(selector);
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}

/**
 * Attach a handler to an event for all elements matching a selector.
 *
 * @param {Element} target Element which the event must bubble to
 * @param {string} selector Selector to match
 * @param {string} type Event name
 * @param {Function} handler Function called when the event bubbles to target
 *                           from an element matching selector
 * @param {boolean} [capture] Capture the event
 */
export function $delegate(target, selector, type, handler, capture) {
	const dispatchEvent = event => {
		const targetElement = event.target;
		const potentialElements = target.querySelectorAll(selector);
		let i = potentialElements.length;

		while (i--) {
			if (potentialElements[i] === targetElement) {
				handler.call(targetElement, event);
				break;
			}
		}
	};

	$on(target, type, dispatchEvent, !!capture);
}

/**
 * Encode less-than and ampersand characters with entity codes to make user-
 * provided text safe to parse as HTML.
 *
 * @param {string} s String to escape
 *
 * @returns {string} String with unsafe characters escaped with entity codes
 */
export const escapeForHTML = s => s.replace(/[&<]/g, c => c === '&' ? '&amp;' : '&lt;');

/**
 * Change DOM Order two childNode on same parent
 *
 * @param {string} parentNode ParentNode
 * @param {number} leftIndex child node left index
 * @param {number} rightIndex child node right index
 */
export function changeDOMOrder(parentNode, childNodes, leftIndex, rightIndex) {
  if (childNodes[0].parentNode !== parentNode) throw new Error("parentNode must be childNodes's parent");
 
  const childNum = childNodes.length;
	const leftElement = childNodes[leftIndex];
	const rightElement = childNodes[rightIndex];
	if (childNum < 2) {
		return;
	} else if (childNum === 2) {
		parentNode.insertBefore(rightElement, leftElement);
		return;
	}

	if (rightIndex - leftIndex > 1) {
		parentNode.insertBefore(leftElement, rightElement);
	}
	parentNode.insertBefore(rightElement, childNodes[leftIndex]);
}
