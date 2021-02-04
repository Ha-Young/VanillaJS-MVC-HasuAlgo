export const BubbleView = function() {
}

BubbleView.prototype.swap = async function(a, b) {
  const $target = document.querySelector('.visual');
  const $boxs = document.querySelectorAll('.sort-box');
  const removePaint = this.removePaint;
  
  $target.classList.remove('wave');
  this.swapUp(a, b);
  this.paintDoing($boxs[a], $boxs[b]);

  await new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 800)
  );

  return new Promise(resolve => {
    const styleA = window.getComputedStyle($boxs[a]);
    const styleB = window.getComputedStyle($boxs[b]);
    
    const transformA = styleA.getPropertyValue('transform');
    const transformB = styleB.getPropertyValue('transform');
    
    const AmatrixValues = transformA.match(/matrix.*\((.+)\)/)[1].split(', ')
    const Ax = AmatrixValues[4]

    const BmatrixValues = transformB.match(/matrix.*\((.+)\)/)[1].split(', ')
    const Bx = BmatrixValues[4]
    
    $boxs[a].style.transform = `matrix(1, 0, 0, 1, ${Ax}, 0)`;
    $boxs[b].style.transform = `matrix(1, 0, 0, 1, ${Bx}, 0)`;
    
    window.requestAnimationFrame(function() {
      setTimeout(() => {
        $target.insertBefore($boxs[b], $boxs[a]);
        removePaint($boxs[b], $boxs[a]);
        $target.classList.add('wave');
        resolve();
      }, 800);
    });
  });
};

BubbleView.prototype.swapUp = function(a, b) {
  const $boxs = document.querySelectorAll('.sort-box');

  const styleA = window.getComputedStyle($boxs[a]);
  const styleB = window.getComputedStyle($boxs[b]);
    
  const transformA = styleA.getPropertyValue('transform');
  const transformB = styleB.getPropertyValue('transform');
    
  const AmatrixValues = transformA.match(/matrix.*\((.+)\)/)[1].split(', ')
  const Ax = AmatrixValues[4]

  const BmatrixValues = transformB.match(/matrix.*\((.+)\)/)[1].split(', ')
  const Bx = BmatrixValues[4]
    
  $boxs[a].style.transform = `matrix(1, 0, 0, 1, ${Bx}, -20)`;
  $boxs[b].style.transform = `matrix(1, 0, 0, 1, ${Ax}, -20)`;
}

BubbleView.prototype.paintDoing = function(a, b) {
  a.style.backgroundColor = '#5D8AA8';
  b.style.backgroundColor = '#5D8AA8';
};

BubbleView.prototype.removePaint = function(a, b) {
  a.style.backgroundColor = '#E5F1FF';
  b.style.backgroundColor = '#E5F1FF';
}

BubbleView.prototype.paintDone = function(n) {
  const $boxs = document.querySelectorAll('.sort-box');
  console.log(n);
  $boxs[$boxs.length -n -1].style.backgroundColor = '#3F468C';
  $boxs[$boxs.length -n -1].style.color = '#E5F1FF';
};
