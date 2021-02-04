export default function View() {
  this.$sortBox = document.getElementById('sortBox');
}

View.prototype._createBlock = function (sortList) {
  if (!Array.isArray(sortList)) {
    throw new Error("실패");
  }

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

View.prototype._swapElements = function (smallValue, largeValue) {
  return new Promise(resolve => {
    const loa = smallValue.getBoundingClientRect().x;
    const lob = largeValue.getBoundingClientRect().x;

    smallValue.classList.add('transition');
    largeValue.classList.add('transition');

    smallValue.style.transform = `translateX(${lob - loa}px)`;
    largeValue.style.transform = `translateX(${loa - lob}px)`;

    setTimeout(() => {
      smallValue.classList.remove('transition');
      largeValue.classList.remove('transition');    

      smallValue.style.transform = 'none';
      largeValue.style.transform = 'none';

      this.$sortBox.insertBefore(smallValue, largeValue);
      resolve();
    }, 1000);
  });
}
