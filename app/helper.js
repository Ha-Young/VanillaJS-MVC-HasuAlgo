export function $on(target, type, callback) {
	target.addEventListener(type, callback);
}
