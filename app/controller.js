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
  const stampStorage = this.model.stampStorage;
  const graphNodes = this.view.$graphNodes;

  for (var i = 0; i < storeageArray.length; i++) {
    for (var j = 0; j < storeageArray.length - 1 - i; j++) {
      stampStorage.push(this.model.getStamp('start', j, j + 1));

      if (storeageArray[j] > storeageArray[j + 1]) {
        const temp = storeageArray[j];

        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = temp;

        stampStorage.push(this.model.getStamp('change', j, j + 1));
      }
      stampStorage.push(this.model.getStamp('finishCompare', j, j + 1))
    }
    stampStorage.push(this.model.getStamp('end', j, j + 1));
  }

  while (stampStorage.length) {
    let leftNode;
    let rightNode;

    switch (stampStorage[0].stampType) {
      case 'start': 
        for (let i = 0; i < graphNodes.length; i++) {
          if (stampStorage[0].leftIndex === Number(graphNodes[i].dataset.x)) leftNode = graphNodes[i];
          if (stampStorage[0].rightIndex === Number(graphNodes[i].dataset.x)) rightNode = graphNodes[i];
          }

          await this.view.changeColor(leftNode, rightNode);

          stampStorage.shift();
          break;

      case 'finishCompare':
        for (let i = 0; i < graphNodes.length; i++) {
          if (stampStorage[0].leftIndex === Number(graphNodes[i].dataset.x)) leftNode = graphNodes[i];
          if (stampStorage[0].rightIndex === Number(graphNodes[i].dataset.x)) rightNode = graphNodes[i];
        }

        await this.view.removeColor(leftNode, rightNode);

        stampStorage.shift();
        break;

      case 'change':
        for (let i = 0; i < graphNodes.length; i++) {
          if (stampStorage[0].leftIndex === Number(graphNodes[i].dataset.x)) leftNode = graphNodes[i];
          if (stampStorage[0].rightIndex === Number(graphNodes[i].dataset.x)) rightNode = graphNodes[i];
        }

        await this.view.moveGraph(leftNode, rightNode);
        await this.view.removeColor(leftNode, rightNode);
      
        let temp = leftNode.dataset.x;
        leftNode.dataset.x = rightNode.dataset.x;
        rightNode.dataset.x = temp;

        stampStorage.shift();
        break;

      case 'end':
        for (let i = 0; i < graphNodes.length; i++) {
          if (stampStorage[0].leftIndex === Number(graphNodes[i].dataset.x)) leftNode = graphNodes[i];
        }

        await this.view.finishColor(leftNode);
        
        stampStorage.shift();
        break;
      }
    }
 }

Controller.prototype.handleKeyUp = function(event) {
  event.stopImmediatePropagation();

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
  this.model.stampStorage = [];
  this.view.indexCount = 0;

  while (this.view.$contentContainer.hasChildNodes()) {
    this.view.$contentContainer.removeChild(this.view.$contentContainer.firstChild);
  }

  this.$bubbleSortButton.style.display = 'inline';
}

export default Controller;
