export default function View() {
  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');
}

View.prototype._createBlock = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    const $block = document.createElement('div');
    const $label = document.createElement('b');

    $block.classList.add('block');
    $block.style.height = `${sortList[i] * 5 + 10}px`;
    $label.textContent = `${sortList[i]}`;
    $label.style.height = `${sortList[i] * 5 + 10}px`;

    $block.appendChild($label);
    this.$sortBox.appendChild($block);
  }
}

View.prototype._swapElements = function (rightElement, leftElement, array, delay) {
  return new Promise(resolve => {
    const rightElementLocationX = this._getTargetTranslateX(rightElement);
    const leftElementLocationX = this._getTargetTranslateX(leftElement);

    this._changeBlockStyle('transition', [rightElement, leftElement]);
    this._changeBlockStyle('selected', [rightElement, leftElement]);

    rightElement.style.transform = `translateX(${leftElementLocationX - rightElementLocationX}px)`;
    leftElement.style.transform = `translateX(${rightElementLocationX - leftElementLocationX}px)`;

    setTimeout(() => {
      rightElement.style.transform = 'none';
      leftElement.style.transform = 'none';
      
      this._changeBlockStyle('selected', [rightElement, leftElement]);

      while (this.$sortBox.hasChildNodes()) {
        this.$sortBox.removeChild(this.$sortBox.firstChild);
      }

      this._createBlock(array);
      resolve();
    }, delay);
  });
}

View.prototype._changeBlockStyle = function (className, elementList) {
  for (let i = 0; i < elementList.length; i++) {
    elementList[i].classList.toggle(className);
  }
}

View.prototype._getTargetTranslateX = function (target) {
  return target.getBoundingClientRect().x;
}

View.prototype._showText = function (text) {
  this.$commentBox.textContent = text;
}
