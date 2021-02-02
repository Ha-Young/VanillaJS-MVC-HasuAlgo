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
