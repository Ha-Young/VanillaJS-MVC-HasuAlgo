(function (window) {
  window.qs = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };

  window.qsa = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
  };

  window.$on = function (target, type, callback) {
    if (target) {
      target.addEventListener(type, callback);
    }
  };
})(window);
