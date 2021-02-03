export const BubbleView = function(template) {
  this.$visualFrame = document.querySelector('.visual-frame');
  this.$visual = document.querySelector('.visual');
  this.$form = document.querySelector('form');
  this.$userValue = document.querySelector('.user-value');
  this.$deleteBtn = document.querySelector('.delete');
  this.$startBtn = document.querySelector('.start');
  this.$resetBtn = document.querySelector('.reset');
  this.boxNum = 0;
}

BubbleView.prototype.addItem = function(input) {
  this.boxNum++;
  console.log(this.boxNum);
  const $box = document.createElement('div');
  $box.className = 'sort-box';
  $box.innerText = input;
  $box.style.height = `${input * 15}px`;
  $box.style.transform = `translateX(${this.boxNum * 25}px)`;

  this.$visual.appendChild($box);

}

BubbleView.prototype.deleteItem = function() {
  this.boxNum--;
  this.$visual.removeChild(this.$visual.lastChild);
}

BubbleView.prototype.resetItem = function(n) {
  this.boxNum = 0;

  for (let i = 0; i < n; i++) {
    this.$visual.removeChild(this.$visual.lastChild);
  }
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
  
}

/*
BubbleView.prototype.paint = function(a, b, n) {
  const $boxs = document.querySelector('.sort-box');

  $boxs[a].style.backgroundColor = "#58B7FF";
  $boxs[b].style.backgroundColor = "#58B7FF";
  $boxs[$boxs.length -n -1].style.backgroundColor = "#13CE66";
}
*/