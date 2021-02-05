(function (window) {
  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.gbc = function (selector, scope) {
    return (scope || document).getElementByClassName(selector);
  };

  window.gbi = function (selector, scope) {
    return (scope || document).getElementById(selector);
  };

  window.$on = function (target, type, callback) {
    if (target) {
      target.addEventListener(type, callback);
    }
  };

  window.wait = function (delay) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  window.createTask = function (type, sourceIndex, targetIndex) {
    return { type, sourceIndex, targetIndex };
  };
})(window);
