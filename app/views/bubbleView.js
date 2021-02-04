export const BubbleView = function() {
}

BubbleView.prototype.swap = function(a, b) {
  const $target = document.querySelector('.visual');
  const $boxs = document.querySelectorAll('.sort-box');

  return new Promise(resolve => {
    const styleA = window.getComputedStyle($boxs[a]);
    const styleB = window.getComputedStyle($boxs[b]);
    
    const transformA = styleA.getPropertyValue('transform');
    const transformB = styleB.getPropertyValue('transform');

    $boxs[a].style.transform = transformB;
    $boxs[b].style.transform = transformA;
    
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        $target.insertBefore($boxs[b], $boxs[a]);
        resolve();
      }, 500);
    });
  });
};

BubbleView.prototype.paint = function(a, b, n) {
  const $boxs = document.querySelector('.sort-box');

  $boxs[a].style.backgroundColor = "#58B7FF";
  $boxs[b].style.backgroundColor = "#58B7FF";
  $boxs[$boxs.length -n -1].style.backgroundColor = "#13CE66";
};