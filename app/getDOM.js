(function (window) {
  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.$on = function (target, type, callback, useCapture) {
    if (target) {
      target.addEventListener(type, callback, !!useCapture);
      console.log("getDOM: $on");
      console.log(target);
    }
  };

  window.$onf;

  window.$delegate = function (target, selector, type, handler) {
    function dispatchEvent(event) {
      const targetElement = event.target;
      const potentialElements = window.qsa(selector, target);
      const hasMatch = potentialElements.indexOf(targetElement) >= 0;

      console.log(targetElement);
      console.log(event);

      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }

    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    const useCapture = type === "blur" || type === "focus";

    window.$on(target, type, dispatchEvent, useCapture);
  };

  window.$parent = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return window.$parent(element.parentNode, tagName);
  };

  NodeList.prototype.forEach = Array.prototype.forEach;
})(window);