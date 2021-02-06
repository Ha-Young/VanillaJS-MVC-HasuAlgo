import View from './view.js';
import Model from './model.js';

function Controller() {
  this.model = new Model;
  this.view = new View;

  this.$typed = document.querySelector(".typed");
  this.$bubbleSortButton = document.querySelector('.bubbleSortButton');
  this.$restartButton = document.querySelector('.restartButton');
}

Controller.prototype.getData = function () {
  this.$typed.addEventListener('keypress', this.handleKeyUp.bind(this));
  this.$bubbleSortButton.addEventListener('click', this.handleBubbleClick.bind(this));
  this.$restartButton.addEventListener('click', this.handleRestartClick.bind(this));
}

Controller.prototype.sortStorage = async function(storeageArray) {
  for (let i = 0; i < storeageArray.length; i++) {
    for (let j = 0; j < storeageArray.length - 1 -i; j++) {
      if (storeageArray[j] > storeageArray[j + 1]) {
        const swap = storeageArray[j];

        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = swap;

        this.model.stampStorage.push(this.model.getStamp(j, j + 1));
      }
    }
  }

  while (this.model.stampStorage.length) {
    let leftNode;
    let rightNode;

    for (let i = 0; i < this.view.$graphNodes.length; i++) {
      if ((this.model.stampStorage[0].leftIndex) === Number(this.view.$graphNodes[i].dataset.x)) {
        leftNode = this.view.$graphNodes[i];
      }

      if ((this.model.stampStorage[0].rightIndex) === Number(this.view.$graphNodes[i].dataset.x)) {
        rightNode = this.view.$graphNodes[i];
      }
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        this.view.moveGraph(leftNode, rightNode);
        resolve();  
      }, 1000);
    });

    let temp = leftNode.dataset.x;
    leftNode.dataset.x = rightNode.dataset.x;
    rightNode.dataset.x = temp;

    this.model.stampStorage.shift();
    }
 }

Controller.prototype.handleKeyUp = function(event) {
  event.stopImmediatePropagation();

  if (event.value === null) return;

  if (event.key === 'Enter') {
    if (this.$typed.value === '') return;

    this.view.addChildNode(event.target.value, this.model.count);
    this.model.storage.push(Number(event.target.value));
    this.$typed.value = '';
  }
}

Controller.prototype.handleBubbleClick = function(event) {
  event.stopImmediatePropagation();

  const childNodesLength = this.view.$contentContainer.childNodes.length;

  if (childNodesLength < 5) {
    this.view.$errorMessage.textContent = '입력 갯수가 너무 작습니다';
    return;
  }

  this.view.$errorMessage.innerHTML = '';
  this.$bubbleSortButton.style.display = 'none';
  
  this.sortStorage(this.model.storage);
}

Controller.prototype.handleRestartClick = function(event) {
  event.stopImmediatePropagation();

  this.model.storage = [];
  this.view.indexCount = 0;

  while (this.view.$contentContainer.hasChildNodes()) {
    this.view.$contentContainer.removeChild(this.view.$contentContainer.firstChild);
  }

  this.$bubbleSortButton.style.display = 'inline';
}

export default Controller;
