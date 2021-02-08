//import a from "../assets/images/chicken.jpg"
export default class View {
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
      $animationBox.children[i].textContent = data[i];
      $animationBox.children[i].style.height = `${ANIMATION_BOX_HEIGHT * data[i] / maxData}px`;
    }
  }

  render(data) {
    const {sortData, leftElement, rightElement} = data;
    const $animationBox = document.querySelector('.animation-box');
    const $statusBox = document.querySelector('.status-box');
    const $playElements = document.querySelectorAll('.play');
    const $pivotElement = document.querySelectorAll('.pivot');
    const leftBar = $animationBox.children[leftElement % sortData.length];
    const rightBar = $animationBox.children[rightElement % sortData.length];
    const maxData = Math.max(...sortData);
    const animationBoxHeight = 200;

    Array.prototype.forEach.call($playElements, item => item.classList.remove('play'));
    Array.prototype.forEach.call($pivotElement, item => item.classList.remove('pivot'));

    leftBar.classList.add('play');
    rightBar.classList.add('play');

    console.log(leftBar.getBoundingClientRect())
    //elem.getBoundingClientRect()

    leftBar.textContent = sortData[leftElement % sortData.length];
    rightBar.textContent = sortData[(rightElement) % sortData.length];

    leftBar.style.height = `${animationBoxHeight * sortData[leftElement % sortData.length] / maxData}px`;
    rightBar.style.height = `${animationBoxHeight * sortData[rightElement % sortData.length] / maxData}px`;

    $statusBox.textContent = 'Searching';

    return;
  }
};

