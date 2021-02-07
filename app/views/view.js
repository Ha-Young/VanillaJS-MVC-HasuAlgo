export const View = function(bubbleView) {
  this.$title = document.querySelector('.title');
  this.$inform = document.querySelector('.inform');
  this.$visual = document.querySelector('.visual');

  this.swap = bubbleView.swap;
  this.swapUp = bubbleView.swapUp;
  this.moveLeft = bubbleView.moveLeft;
  this.paintDoing = bubbleView.paintDoing;
  this.paintWaiting = bubbleView.paintWaiting;
  this.paintDone = bubbleView.paintDone;
}

View.prototype.create = function(v, n) {
  const $box = document.createElement('div');
  
  $box.className = 'sort-box';
  $box.innerText = v;
  $box.style.height = `${v * 20}px`;
  $box.style.transform = `translateX(${(n -1) * 45}px)`;
  
  this.$visual.appendChild($box);

  const $boxs = document.querySelectorAll('.sort-box');

  if (n > 5) {
    $boxs.forEach(item => {
      item.style.left = `${235 - (n - 5) * 25}px`
    });
  }
};

View.prototype.delete = function(n) {
  const $boxs = document.querySelectorAll('.sort-box');
  
  if (n > 5) {
    $boxs.forEach(item => {
      item.style.left = `${235 - (n - 5) * 25}px`
    });
  }

  this.$visual.removeChild(this.$visual.lastChild);
};

View.prototype.clear = function(n) {
  for (let i = 0; i < n; i++) {
    this.$visual.removeChild(this.$visual.lastChild);
  }
};

View.prototype.changeBubble = function() {
  this.$title.innerText = 'Bubble Sort';
  this.$inform.style.visibility = 'hidden';
};

View.prototype.changeMerge = function() {
  this.$title.innerText = 'Merge Sort';
  this.$inform.style.visibility = 'visible';
};
