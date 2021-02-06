export default function View() {
  this.$inputBox = document.getElementById('inputBox');
  this.$sortBox = document.getElementById('sortBox');
  this.$commentBox = document.getElementById('commentBox');
  this.canPaint = true;
  this.styleClassName = {
    transition : 'transition',
    select : 'selected',
    none: 'none'
  };
}

View.prototype._createBlock = function (sortList) {
  const highestValue = Math.max(...sortList);

  this.canPaint = true;

  for (let i = 0; i < sortList.length; i++) {
    const $block = document.createElement('div');
    const $label = document.createElement('b');

    $block.classList.add('block');
    $block.style.height = `${sortList[i] / highestValue * 90}%`;
    $label.textContent = `${sortList[i]}`;
    $label.style.height = `${sortList[i] / highestValue * 90}%`;

    $block.appendChild($label);
    this.$sortBox.appendChild($block);
  }
}

View.prototype._swapElements = function (rightElement, leftElement, swappedArray, delay) {
  return new Promise(resolve => {
    const rightElementLocationX = this._getTargetTranslateX(rightElement);
    const leftElementLocationX = this._getTargetTranslateX(leftElement);

    this._changeBlockStyle(this.styleClassName['transition'], [rightElement, leftElement]);
    this._changeBlockStyle(this.styleClassName['select'], [rightElement, leftElement]);

    rightElement.style.transform = `translateX(${leftElementLocationX - rightElementLocationX}px)`;
    leftElement.style.transform = `translateX(${rightElementLocationX - leftElementLocationX}px)`;

    setTimeout(() => {
      rightElement.style.transform = this.styleClassName['none'];
      leftElement.style.transform = this.styleClassName['none'];
      
      this._changeBlockStyle(this.styleClassName['select'], [rightElement, leftElement]);

      while (this.$sortBox.hasChildNodes()) {
        this.$sortBox.removeChild(this.$sortBox.firstChild);
      }

      if (this.canPaint) {
        this._createBlock(swappedArray);
      }

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

View.prototype._clearInputText = function () {
  this.$inputBox.value = '';
}
