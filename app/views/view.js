export const View = function(view) {
  this.$visualFrame = document.querySelector('.visual-frame');
  this.$visual = document.querySelector('.visual');

  this.swap = view.swap;
  this.swapUp = view.swapUp;
  this.paintDoing = view.paintDoing;
  this.removePaint = view.removePaint;
  this.paintDone = view.paintDone;
}

View.prototype.create = function(v, n) {
  const $box = document.createElement('div');
  
  $box.className = 'sort-box';
  $box.innerText = v;
  $box.style.height = `${v * 15}px`;
  $box.style.transform = `translateX(${(n -1) * 25}px)`;
  
  this.$visual.appendChild($box);
};

View.prototype.delete = function() {
  this.$visual.removeChild(this.$visual.lastChild);
};

View.prototype.clear = function(n) {
  for (let i = 0; i < n; i++) {
    this.$visual.removeChild(this.$visual.lastChild);
  }
};
