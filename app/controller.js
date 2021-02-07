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
      this.model.getStamp('start', j, j + 1);

      if (storeageArray[j] > storeageArray[j + 1]) {
        const temp = storeageArray[j];

        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = temp;

        this.model.getStamp('change', j, j + 1);
      }
      this.model.getStamp('finishCompare', j, j + 1)
    }
    this.model.getStamp('end', j, j + 1);
  }

  while (stampStorage.length) {
    let leftNode;
    let rightNode;
    const firstStamp = stampStorage[0];
    const moveValue = (600 / graphNodes.length);

    switch (firstStamp.stampType) {
      case 'start':

        leftNode = this.findLeftNode(graphNodes, firstStamp);
        rightNode = this.findRightNode(graphNodes, firstStamp);

          await this.view.changeColor(leftNode, rightNode);

          stampStorage.shift();
          break;

      case 'finishCompare':

        leftNode = this.findLeftNode(graphNodes, firstStamp);
        rightNode = this.findRightNode(graphNodes, firstStamp);

        await this.view.removeColor(leftNode, rightNode);

        stampStorage.shift();
        break;

      case 'change':

        leftNode = this.findLeftNode(graphNodes, firstStamp);
        rightNode = this.findRightNode(graphNodes, firstStamp);

        await this.view.moveGraph(leftNode, rightNode, moveValue);
        await this.view.removeColor(leftNode, rightNode);

        let temp = leftNode.dataset.x;
        leftNode.dataset.x = rightNode.dataset.x;
        rightNode.dataset.x = temp;

        stampStorage.shift();
        break;

      case 'end':

        leftNode = this.findLeftNode(graphNodes, firstStamp);

        await this.view.finishColor(leftNode);

        stampStorage.shift();
        break;
      }
    }
 }

Controller.prototype.findLeftNode = function(nodes, stamp) {
  for (let i = 0; i < nodes.length; i++) {
    if (stamp.leftIndex === Number(nodes[i].dataset.x)) return nodes[i];
  }
}

Controller.prototype.findRightNode = function(nodes, stamp) {
  for (let i = 0; i < nodes.length; i++) {
    if (stamp.rightIndex === Number(nodes[i].dataset.x)) return nodes[i];
  }
}

Controller.prototype.handleKeyUp = function(event) {
  event.stopImmediatePropagation();

  if (event.key === 'Enter') {
    if (this.$typed.value === '') return;

    if (this.$typed.value < 1 || this.$typed.value > 100) return;

    this.view.addChildNode(event.target.value);
    this.model.storage.push(Number(event.target.value));
    this.$typed.value = null;
  }
}

Controller.prototype.handleBubbleClick = function(event) {
  event.stopImmediatePropagation();

  const childNodesLength = this.view.$contentContainer.childNodes.length;

  if (childNodesLength < 5) {
    this.view.$errorMessage.textContent = '입력 갯수가 너무 작습니다';
    return;
  }

  if (childNodesLength > 10) {
    console.log(childNodesLength)
    this.view.$errorMessage.textContent = "입력 갯수를 초과하셨습니다"
    return;
  }

  this.view.$errorMessage.innerHTML = null;
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

  this.view.$contentContainer.textContent = null;
  this.$bubbleSortButton.style.display = 'inline';
}

export default Controller;
