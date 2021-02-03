export default function View() {
  this.$sortBox = document.getElementById('sortBox');
  this.LOCATION_X = 0.15;
}

View.prototype._createBlock = function (sortList) {
  if (!Array.isArray(sortList)) {
    throw new Error("실패");
  }

  for (let i = 0; i < sortList.length; i++) {
    const $block = document.createElement('div');
    const $label = document.createElement('b');

    this.LOCATION_X += 0.15;

    $block.classList.add('block');
    $block.style.height = `${sortList[i] * 5 + 10}px`;
    $block.style.transform = `translateX(${this.LOCATION_X}rem)`;
    $label.textContent = `${sortList[i]}`;
    $label.style.height = `${sortList[i] * 5 + 10}px`

    $block.appendChild($label);
    this.$sortBox.appendChild($block);
  }
}

View.prototype._swapElement = function (smallValue, largeValue) {
  const smallValueStyle = window.getComputedStyle(smallValue);
  const largeValueStyle = window.getComputedStyle(largeValue);

  const smallValueLocation = smallValueStyle.getPropertyValue('transform');
  const largeValueLocation = largeValueStyle.getPropertyValue('transform');

  smallValue.style.transform = largeValueLocation;
  largeValue.style.transform = smallValueLocation;
}
