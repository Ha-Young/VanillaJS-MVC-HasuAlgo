export default class View {
  constructor() {
    this.barOriginalPosition = [];
  }

  addEvent(target, event, handler) {
    document.querySelector(target).addEventListener(event, handler);
  }

  getDOM(target, property) {
    return document.querySelector(target)[property];
  }

  disableButton(target) {
    document.querySelector(target).disabled = true;
  }

  initialRender(data) {
    const $animationBox = document.querySelector('.animation-box');
    const oldNodeNumbers = $animationBox.children.length;
    const maxData = Math.max(...data);
    const ANIMATION_BOX_HEIGHT = 200;
    const $animationBoxFirstChild = $animationBox.children[0];

    for (let i = 0; i < oldNodeNumbers; i++) {
      $animationBoxFirstChild.remove();
    }

    for (let i = 0; i < data.length; i++) {
      $animationBox.appendChild(document.createElement('div'));
      $animationBox.children[i].dataset.id = i;
      $animationBox.children[i].dataset.moveDistance = 0;
      $animationBox.children[i].textContent = data[i];
      $animationBox.children[i].style.cssText = `height: ${ANIMATION_BOX_HEIGHT * data[i] / maxData}px`;
    }
  }

  render(data) {
    const {sortData, leftElement, rightElement, isSwap} = data;
    const $statusBox = document.querySelector('.status-box');
    const $playElements = document.querySelectorAll('.play');
    const leftBar = document.querySelector(`[data-id="${leftElement % sortData.length}"]`);
    const rightBar = document.querySelector(`[data-id="${rightElement % sortData.length}"]`);
    const distance = rightBar.getBoundingClientRect().x- leftBar.getBoundingClientRect().x;

    $statusBox.textContent = 'Searching';
    Array.prototype.forEach.call($playElements, item => item.classList.remove('play'));
    leftBar.classList.add('play');
    rightBar.classList.add('play');

    if (isSwap) {
      const temp = leftBar.dataset.id;

      leftBar.dataset.moveDistance = parseInt(leftBar.dataset.moveDistance, 10) + distance;
      rightBar.dataset.moveDistance = parseInt(rightBar.dataset.moveDistance, 10) - distance;
      leftBar.style.transform = `translate(${leftBar.dataset.moveDistance}px)`;
      rightBar.style.transform = `translate(${rightBar.dataset.moveDistance}px)`;
      leftBar.dataset.id = rightBar.dataset.id;
      rightBar.dataset.id = temp;
    }

    return;
  }
};
