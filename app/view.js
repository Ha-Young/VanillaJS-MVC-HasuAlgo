import {pause} from './helpers';

export default class View {
  constructor() {
    this.$inputNumbers = document.querySelector('#input-form');
    this.$inputBtn = document.querySelector("#input-btn");
    this.$bubbleBtn = document.querySelector('#bubble');
    this.$quickBtn = document.querySelector('#quick');
    this.$executeBtn = document.querySelector('#execute-btn');
    this.$sortingWindow = document.querySelector('.execute-window');
    this.$inputBox = document.querySelector('#input-form');
    this.$inputButtonText = document.querySelector('#input-text');
    this.$executeButtonText = document.querySelector('#execute-text');
    this.$inputButtonLoader = document.querySelector('#input-loader');
    this.$executeButtonLoader = document.querySelector('#execute-loader');
  }

  drawItem(value, index, length) {
    const newItem = document.createElement('div');

    newItem.classList.add('flex-item', 'sort-list');
    newItem.style.height = `${(400 / length) * (index + 1)}px`;
    newItem.textContent = value;

    this.$sortingWindow.appendChild(newItem);
  }

  clearSortingWindow() {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList.forEach((node) => node.remove());
  }

  initializeInput() {
    this.$inputBox.value = '';
    this.$inputBox.placeholder = '5~10개의 숫자를 콤마로 구분하여 입력';
    this.$inputBox.classList.remove('set-placeholder');
    this.clearSortingWindow();
  }

  displayErrorMessage(message) {
    this.$inputBox.placeholder = message;
    this.$inputBox.classList.add('set-placeholder');
  }

  changeOrder(firstOrder, secondOrder) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[firstOrder].classList.remove('move-right');
    nodeList[secondOrder - 1].classList.remove('move-left');

    this.$sortingWindow.insertBefore(nodeList[firstOrder], nodeList[secondOrder]);
  }

  changeOrderQuick(startIndex, endIndex) {
    const nodeList = this.$sortingWindow.childNodes;
    const rightClone = nodeList[endIndex];

    nodeList[startIndex].classList.remove('move-quick');
    nodeList[startIndex].style.removeProperty('transform');
    nodeList[endIndex].classList.remove('move-quick');
    nodeList[endIndex].style.removeProperty('transform');

    this.$sortingWindow.replaceChild(nodeList[startIndex], nodeList[endIndex]);
    this.$sortingWindow.insertBefore(rightClone, nodeList[startIndex]);
  }

  deactivateButtons(inputBtnEventHandler, executeBtnEventHandler, setAlgorithmBtnEventHandler) {
    this.$inputButtonText.classList.add('none');
    this.$inputButtonLoader.classList.remove('none');
    this.$executeButtonText.classList.add('none');
    this.$executeButtonLoader.classList.remove('none');

    this.$inputBtn.removeEventListener('click', inputBtnEventHandler);
    this.$executeBtn.removeEventListener('click', executeBtnEventHandler);
    this.$bubbleBtn.removeEventListener('click', setAlgorithmBtnEventHandler);
    this.$quickBtn.removeEventListener('click', setAlgorithmBtnEventHandler);
  }

  activateButtons(inputBtnEventHandler, executeBtnEventHandler, setAlgorithmBtnEventHandler) {
    this.$inputButtonText.classList.remove('none');
    this.$inputButtonLoader.classList.add('none');
    this.$executeButtonText.classList.remove('none');
    this.$executeButtonLoader.classList.add('none');

    this.bindInputBtnEventHandler(inputBtnEventHandler);
    this.bindExecuteBtnEventHandler(executeBtnEventHandler);
    this.bindSetAlgorithmBtnEventHandler(setAlgorithmBtnEventHandler);
  }

  async changeClass(pauseTime, type, className, ...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList[type](className);
    });

    if (pauseTime) {
      await pause(pauseTime);
    }
  }

  async switchItemsWithAnimation(pauseTime, movingIndex) {
    this.changeClass(null, 'add', 'move-right', movingIndex);
    this.changeClass(null, 'add', 'move-left', movingIndex + 1);
    await pause(pauseTime);
    this.changeOrder(movingIndex, movingIndex + 2);
  }

  async switchQuickItemsWithAnimation(pauseTime, startIndex, endIndex) {
    this.quickMoveAnimation(startIndex, endIndex);
    this.quickMoveAnimation(endIndex, startIndex);
    await pause(pauseTime);

    this.changeOrderQuick(startIndex, endIndex);
    await pause(pauseTime);
  }

  quickMoveAnimation(currentIndex, movedIndex) {
    const nodeList = this.$sortingWindow.childNodes;
    const distance = (movedIndex - currentIndex) * 70;

    nodeList[currentIndex].classList.add('move-quick');
    nodeList[currentIndex].style.transform = `translateX(${distance}px)`;
  }

  changeColorOfQuickItem(type, startIndex, endIndex) {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = startIndex; i <= endIndex; i++) {
      nodeList[i].classList[type]('quick-group');
    }
  }

  bindInputBtnEventHandler(handler) {
    this.$inputBtn.addEventListener('click', handler);
  }

  bindSetAlgorithmBtnEventHandler(handler) {
    this.$bubbleBtn.addEventListener('click', handler);
    this.$quickBtn.addEventListener('click', handler);
  }

  bindExecuteBtnEventHandler(handler) {
    this.$executeBtn.addEventListener('click', handler);
  }
}
