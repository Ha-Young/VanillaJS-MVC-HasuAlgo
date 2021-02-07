import { pause } from './helpers';
import { params } from './constants';

export default class View {
  constructor() {
    this.$inputBox = document.querySelector('#input-box');
    this.$inputBtn = document.querySelector("#input-btn");
    this.$bubbleBtn = document.querySelector('#bubbleSort');
    this.$quickBtn = document.querySelector('#quickSort');
    this.$executeBtn = document.querySelector('#execute-btn');
    this.$sortingWindow = document.querySelector('.sorting-window');
    this.$inputButtonText = document.querySelector('#input-btn-text');
    this.$executeButtonText = document.querySelector('#execute-btn-text');
    this.$inputButtonLoader = document.querySelector('#input-btn-loader');
    this.$executeButtonLoader = document.querySelector('#execute-btn-loader');
  }

  drawItem(value, index, length) {
    const newItem = document.createElement('div');
    const MAX_HEIGHT = 400;

    newItem.classList.add('flex-item', 'sort-list');
    newItem.style.height = `${(MAX_HEIGHT / length) * (index + 1)}px`;
    newItem.textContent = value;

    this.$sortingWindow.appendChild(newItem);
  }

  clearSortingWindow() {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].remove();
    }
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
    this.bindSetSortTypeBtnEventHandler(setAlgorithmBtnEventHandler);
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
    return;
  }

  async switchQuickItemsWithAnimation(pauseTime, startIndex, endIndex) {
    this.quickMoveAnimation(startIndex, endIndex);
    this.quickMoveAnimation(endIndex, startIndex);
    await pause(pauseTime);

    this.changeOrderQuick(startIndex, endIndex);
    await pause(pauseTime);
  }

  quickMoveAnimation(currentIndex, movedIndex) {
    const DISTANCE_FOR_INDEX = 70;
    const nodeList = this.$sortingWindow.childNodes;
    const calculatedDistance = (movedIndex - currentIndex) * DISTANCE_FOR_INDEX;

    nodeList[currentIndex].classList.add('move-quick');
    nodeList[currentIndex].style.transform = `translateX(${calculatedDistance}px)`;
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

  bindSetSortTypeBtnEventHandler(handler) {
    this.$bubbleBtn.addEventListener('click', handler);
    this.$quickBtn.addEventListener('click', handler);
  }

  bindExecuteBtnEventHandler(handler) {
    this.$executeBtn.addEventListener('click', handler);
  }

  async visualizeBubbleSort(visualizeQueue) {
    const PAUSE_TIME = 500;

    for (const job of visualizeQueue) {
      switch (job.type) {
        case params.selected:
          await this.changeClass(PAUSE_TIME, params.add, params.selected, job.innerIndex, job.innerIndex + 1);
          break;
        case params.swap:
          await this.switchItemsWithAnimation(PAUSE_TIME, job.innerIndex);
          break;
        case params.deselected:
          await this.changeClass(PAUSE_TIME, params.remove, params.selected, job.innerIndex, job.innerIndex + 1);
          break;
        case params.sorted:
          await this.changeClass(PAUSE_TIME, params.add, params.sorted, job.outerIndex);
          break;
        case params.done:
          await this.changeClass(PAUSE_TIME, params.add, params.sorted, ...job.outerIndex);
          break;
      }
    }
  }
}

