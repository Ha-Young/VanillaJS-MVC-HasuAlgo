export const BubbleView = function(template) {
  this._template = template;
  this._$visualBox = document.querySelector('.visual-box');
  this._$visual = document.querySelector('.visual');
  this._$form = document.querySelector('form');
  this._$userValue = document.querySelector('.user-value');
  this._$deleteBtn = document.querySelector('.delete');
  this._$startBtn = document.querySelector('.start');
  this._$resetBtn = document.querySelector('.reset');
  this._$boxNum = 0;
}

BubbleView.prototype.addItem = function(input) {
  this._$boxNum++;

  const $box = document.createElement('div');

  $box.className = 'sort-box';
  $box.innerText = input;
  $box.style.height = `${input * 15}px`;
  $box.style.transform = `translateX(${this._$boxNum * 25}px)`;

  this._$visual.appendChild($box);
}

BubbleView.prototype.deleteItem = function() {
  this._$boxNum--;
  this._$visual.removeChild(this._$visual.lastChild);
}

BubbleView.prototype.resetItem = function(n) {
  this._$boxNum = 0;

  for (let i = 0; i < n; i++) {
    this._$visual.removeChild(this._$visual.lastChild);
  }
}

BubbleView.prototype.swap = function(a, b) {
  const target = document.querySelector('.visual');
  const $boxs = document.querySelectorAll('.sort-box');
  
  return new Promise(resolve => {
    const styleA = window.getComputedStyle($boxs[a]);
    const styleB = window.getComputedStyle($boxs[b]);

    const transformA = styleA.getPropertyValue('transform');
    const transformB = styleB.getPropertyValue('transform');

    $boxs[a].style.transform = transformB;
    $boxs[b].style.trnasform = transformA;

    window.requestAnimationFrame(function() {
      setTimeout(() => {
        target.insertBefore($boxs[b], $boxs[a]);
        resolve();
      }, 100);
    });
  });
}

BubbleView.prototype.move = async function(a, b) {
  await new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, 100)
  );
  await this.swap(a, b);
}

BubbleView.prototype.stay = function() {
  const $boxs = document.querySelectorAll('.sort-box');

  $boxs[$boxs.length -i -1].style.backgroundColor = "#13CE66";
}
