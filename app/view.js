export default class View {
  constructor() {
    this.$inputNumbers = document.querySelector('#input-form'),
    this.$inputBtn = document.querySelector("#input-btn"),
    this.$bubbleBtn = document.querySelector('#bubble'),
    this.$quickBtn = document.querySelector('#quick'),
    this.$executeBtn = document.querySelector('#execute-btn'),
    this.$sortingWindow = document.querySelector('.execute-window');
    this.$errorMsg = document.querySelector('#input-form');
  }

  addItem = function (value, index, length) {
    const child = document.createElement('div');

    child.classList.add('flex-item', 'sort-list');
    child.style.height = `${(400/length) * (index+1)}px`;
    child.textContent = value;

    this.$sortingWindow.appendChild(child);
  }

  clearItems = function () {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = nodeList.length - 1; i >= 0; i--) {
      nodeList[i].remove();
    }
  }

  displayErrorMessage = function(message) {
    this.$errorMsg.placeholder = message;
    this.$errorMsg.classList.add('set-placeholder');
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

  shutDownButtons = function () {
    document.querySelector('#input-text').classList.add('none');
    document.querySelector('#loader1').classList.remove('none');
    document.querySelector('#execute-text').classList.add('none');
    document.querySelector('#loader2').classList.remove('none');

    this.$inputBtn.outerHTML = this.$inputBtn.outerHTML;
    this.$executeBtn.outerHTML = this.$executeBtn.outerHTML;
  }

  reopenButtons = function () {
    document.querySelector('#input-text').classList.remove('none');
    document.querySelector('#loader1').classList.add('none');
    document.querySelector('#execute-text').classList.remove('none');
    document.querySelector('#loader2').classList.add('none');

    this.$inputBtn = document.querySelector("#input-btn");
    this.$executeBtn = document.querySelector('#execute-btn');
  }

  moveRight (index) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[index].classList.add('move-right');
  }

  moveLeft (index) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[index].classList.add('move-left');
  }

  moveQuick (index, whereToGoNanADiRo) {
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

  quickGroup = function (left, right) {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = left; i <= right; i++) {
      nodeList[i].classList.add('quick-group');
    }
  }

  quickGroupRemove = function (left, right) {
    const nodeList = this.$sortingWindow.childNodes;

    for (let i = left; i <= right; i++) {
      nodeList[i].classList.remove('quick-group');
    }
  }

  bindAddArray = function (handler) {
    this.$inputBtn.addEventListener('click', handler);
  }

  bindsetAlgorithm = function (handler) {
    this.$bubbleBtn.addEventListener('click', handler);
    this.$quickBtn.addEventListener('click', handler);
  }

  bindExecuteSortingAldorithm = function (handler) {
    this.$executeBtn.addEventListener('click', handler);
  }
}
