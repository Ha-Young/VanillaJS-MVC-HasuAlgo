import { colors } from '../colors';

export const BubbleView = function() {
}

BubbleView.prototype.swap = async function(prev, back, isEqual) {
  const $target = document.querySelector('.visual');
  const $boxs = document.querySelectorAll('.sort-box');
  const paintWaiting = this.paintWaiting;
  const DELAY = 800;
  
  if (isEqual) {
    this.paintDoing($boxs[prev], $boxs[back]);

    await new Promise(resolve =>
      setTimeout(resolve, DELAY)
    );

    return new Promise(resolve => {
      setTimeout(() => {
        paintWaiting($boxs[prev], $boxs[back]);
        resolve();
      });
    }, DELAY)
  }

  $target.classList.remove('wave');
  this.swapUp(prev, back);
  this.paintDoing($boxs[prev], $boxs[back]);

  await new Promise(resolve =>
    setTimeout(resolve, DELAY)
  );

  return new Promise(resolve => {
    const styleA = window.getComputedStyle($boxs[prev]);
    const styleB = window.getComputedStyle($boxs[back]);
    
    const transformA = styleA.getPropertyValue('transform');
    const transformB = styleB.getPropertyValue('transform');
    
    const AmatrixValues = transformA.match(/matrix.*\((.+)\)/)[1].split(', ')
    const Ax = AmatrixValues[4]

    const BmatrixValues = transformB.match(/matrix.*\((.+)\)/)[1].split(', ')
    const Bx = BmatrixValues[4]
    
    $boxs[prev].style.transform = `matrix(1, 0, 0, 1, ${Ax}, 0)`;
    $boxs[back].style.transform = `matrix(1, 0, 0, 1, ${Bx}, 0)`;
    
    setTimeout(() => {
      $target.insertBefore($boxs[back], $boxs[prev]);
      paintWaiting($boxs[back], $boxs[prev]);
      $target.classList.add('wave');
      resolve();
    }, DELAY);
  });
};

BubbleView.prototype.swapUp = function(prev, back) {
  const $boxs = document.querySelectorAll('.sort-box');

  const styleA = window.getComputedStyle($boxs[prev]);
  const styleB = window.getComputedStyle($boxs[back]);
    
  const transformA = styleA.getPropertyValue('transform');
  const transformB = styleB.getPropertyValue('transform');
    
  const AmatrixValues = transformA.match(/matrix.*\((.+)\)/)[1].split(', ')
  const Ax = AmatrixValues[4]

  const BmatrixValues = transformB.match(/matrix.*\((.+)\)/)[1].split(', ')
  const Bx = BmatrixValues[4]
    
  $boxs[prev].style.transform = `matrix(1, 0, 0, 1, ${Bx}, -20)`;
  $boxs[back].style.transform = `matrix(1, 0, 0, 1, ${Ax}, -20)`;
}

BubbleView.prototype.paintDoing = function(prev, back) {
  prev.style.backgroundColor = colors.DOING;
  back.style.backgroundColor = colors.DOING;
};

BubbleView.prototype.paintWaiting = function(prev, back) {
  prev.style.backgroundColor = colors.WAITING;
  back.style.backgroundColor = colors.WAITING;
}

BubbleView.prototype.paintDone = function(n) {
  const $boxs = document.querySelectorAll('.sort-box');
  
  $boxs[$boxs.length -n -1].style.backgroundColor = colors.DONE_BG;
  $boxs[$boxs.length -n -1].style.color = colors.DONE_COLOR;
};
