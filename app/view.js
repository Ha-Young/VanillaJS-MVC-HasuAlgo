import {$on} from './helper';

export default class View {
  constructor() {
    this.$inputNumbers = document.querySelector('#input-form'),
    this.$inputBtn = document.querySelector("#input-btn"),
    this.$bubbleBtn = document.querySelector('#bubble'),
    this.$quickBtn = document.querySelector('#quick'),
    this.$executeBtn = document.querySelector('#execute-btn'),
    this.$sortingWindow = document.querySelector('.execute-window');
    this.$errorMsg = document.querySelector('#errorMsg');
  }

  addItem = function (value, firstOrder, index, length) {
    const child = document.createElement('div');
    child.classList.add('flex-item');
    child.classList.add('sort-list');
    child.style.height = `${(400/length) * (index+1)}px`;
    child.id = `itemId-${value}`;
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
    this.$errorMsg.textContent = message;
  }

  changeOrder = function (firstOrder, secondOrder) {
    const nodeList = this.$sortingWindow.childNodes;
    nodeList[firstOrder].classList.remove('move-right');
    nodeList[secondOrder - 1].classList.remove('move-left');
    this.$sortingWindow.insertBefore(nodeList[firstOrder], nodeList[secondOrder]);
  }

  moveRight (index) {
    const nodeList = this.$sortingWindow.childNodes;
    nodeList[index].classList.add('move-right');
  }

  moveLeft (index) {
    const nodeList = this.$sortingWindow.childNodes;
    nodeList[index].classList.add('move-left');
  }

  changeColorOfSelectedItem = function (index1, index2) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[index1].classList.add('selected');
    nodeList[index2].classList.add('selected');
  }

  removeColorOfUnselectedItem = function (index1, index2) {
    const nodeList = this.$sortingWindow.childNodes;

    nodeList[index1].classList.remove('selected');
    nodeList[index2].classList.remove('selected');
  }

  changeColorOfSortedItem = function (indexList) {
    const nodeList = this.$sortingWindow.childNodes;

    indexList.forEach((index) => {
      nodeList[index].classList.add('sorted')
    });
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
