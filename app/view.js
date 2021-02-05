export default function View() {
  this.$sortBox = document.getElementById('sortBox');
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

View.prototype._swapElements = function (smallValue, largeValue, swapList, delay) {
  return new Promise(resolve => {
    const smallValueLocationX = this._getTargetTranslateX(smallValue);
    const largeValueLocationX = this._getTargetTranslateX(largeValue);

    this._changeBlockStyle(smallValue, largeValue, 'transition');
    this._changeBlockStyle(smallValue, largeValue, 'selected');

    smallValue.style.transform = `translateX(${largeValueLocationX - smallValueLocationX}px)`;
    largeValue.style.transform = `translateX(${smallValueLocationX - largeValueLocationX}px)`;

    setTimeout(() => {
      smallValue.style.transform = 'none';
      largeValue.style.transform = 'none';
      
      this._changeBlockStyle(smallValue, largeValue, 'selected');
      while (this.$sortBox.hasChildNodes()) {
        this.$sortBox.removeChild(this.$sortBox.firstChild);
      }

      this._createBlock(swapList);
      resolve();
    }, delay);
  });
}

View.prototype._changeBlockStyle = function (leftElement, rightElement, className) {
  leftElement.classList.toggle(className);
  rightElement.classList.toggle(className);
}


View.prototype._getTargetTranslateX = function (target) {
  return target.getBoundingClientRect().x;
}
