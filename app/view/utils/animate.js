export function fromToTranslatePosition(element, from, to, duration) {
  const start = new Date().getTime();

  const timer = setInterval(function() {
    const time = new Date().getTime() - start;
    const mx = easeInOutQuart(time, from.x, to.x - from.x, duration);
    const my = easeInOutQuart(time, from.y, to.y - from.y, duration);
    element.setAttribute('transform', `translate(${mx}, ${my})`);
    if (time >= duration) clearInterval(timer);
  }, 1000 / 60);
}

// factory function for create position object
export function positionFactory(x, y) {
  return {
    x,
    y
  }
}

//
// http://easings.net/#easeInOutQuart
//  t: current time
//  b: beginning value
//  c: change in value
//  d: duration
//
function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}
