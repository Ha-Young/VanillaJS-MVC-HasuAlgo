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

  drawItem = function (value, index, length) {
    const newItem = document.createElement('div');

    newItem.classList.add('flex-item', 'sort-list');
    newItem.style.height = `${(400 / length) * (index + 1)}px`;
    newItem.textContent = value;

    this.$sortingWindow.appendChild(newItem);
  }

  clearSortingWindow = function () {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].remove();
    }
  }

  initializeInput = function () {
    this.$inputBox.value = '';
    this.$inputBox.placeholder = '5~10개의 숫자를 콤마로 구분하여 입력';
    this.$inputBox.classList.remove('set-placeholder');
    this.clearSortingWindow();
  }

  displayErrorMessage = function (message) {
    this.$inputBox.placeholder = message;
    this.$inputBox.classList.add('set-placeholder');
  }

  changeOrder = function (firstOrder, secondOrder) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[firstOrder].classList.remove('move-right');
    nodeList[secondOrder - 1].classList.remove('move-left');

    this.$sortingWindow.insertBefore(nodeList[firstOrder], nodeList[secondOrder]);
  }

  changeOrderQuick = function (left, right) {
    const nodeList = this.$sortingWindow.childNodes;
    const rightClone = nodeList[right];

    nodeList[left].classList.remove('move-quick');
    nodeList[left].style.removeProperty('transform');
    nodeList[right].classList.remove('move-quick');
    nodeList[right].style.removeProperty('transform');

    this.$sortingWindow.replaceChild(nodeList[left], nodeList[right]);
    this.$sortingWindow.insertBefore(rightClone, nodeList[left]);
  }

  deactivateButtons = function (inputBtnEventHandler, executeBtnEventHandler, setAlgorithmHandler) {
    this.$inputButtonText.classList.add('none');
    this.$inputButtonLoader.classList.remove('none');
    this.$executeButtonText.classList.add('none');
    this.$executeButtonLoader.classList.remove('none');

    this.$inputBtn.removeEventListener('click', inputBtnEventHandler);
    this.$executeBtn.removeEventListener('click', executeBtnEventHandler);
    this.$bubbleBtn.removeEventListener('click', setAlgorithmHandler);
    this.$quickBtn.removeEventListener('click', setAlgorithmHandler);
  }

  activateButtons = function (inputBtnEventHandler, executeBtnEventHandler, setAlgorithmHandler) {
    this.$inputButtonText.classList.remove('none');
    this.$inputButtonLoader.classList.add('none');
    this.$executeButtonText.classList.remove('none');
    this.$executeButtonLoader.classList.add('none');

    this.bindAddArray(inputBtnEventHandler);
    this.bindExecuteSortingAlgorithm(executeBtnEventHandler);
    this.bindSetAlgorithm(setAlgorithmHandler);
  }

  changeClass = function (type, className, ...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList[type](className);
    });
  }

  moveRight = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.add('move-right');
    });
  }

  moveLeft = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.add('move-left');
    });
  }

  moveQuick = function (index, whereToGoNanADiRo) {
    const nodeList = this.$sortingWindow.childNodes;
    const distance = (whereToGoNanADiRo - index) * 70;

    nodeList[index].classList.add('move-quick');
    nodeList[index].style.transform = `translateX(${distance}px)`;
  }

  changeColorOfSelectedItem = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.add('selected');
    });
  }

  removeColorOfUnselectedItem = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.remove('selected');
    });
  }

  changeColorOfSortedItem = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.add('sorted');
    });
  }

  removeColorOfSortedItem = function (...indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.remove('sorted');
    });
  }

  changeColorOfSelectedQuickItem = function (left, right) {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = left; i <= right; i++) {
      nodeList[i].classList.add('quick-group');
    }
  }

  removeColorOfDeselectedQuickItem = function (left, right) {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = left; i <= right; i++) {
      nodeList[i].classList.remove('quick-group');
    }
  }

  bindAddArray = function (handler) {
    this.$inputBtn.addEventListener('click', handler);
  }

  bindSetAlgorithm = function (handler) {
    this.$bubbleBtn.addEventListener('click', handler);
    this.$quickBtn.addEventListener('click', handler);
  }

  bindExecuteSortingAlgorithm = function (handler) {
    this.$executeBtn.addEventListener('click', handler);
  }
}
