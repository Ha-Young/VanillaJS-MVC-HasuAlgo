import View from './view.js'
import Model from './model.js'

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
    for (var j= 0; j <storeageArray.length - 1 -i; j++) {
      if (storeageArray[j] > storeageArray[j + 1]) {
        let swap = storeageArray[j];

        storeageArray[j] = storeageArray[j + 1];
        storeageArray[j + 1] = swap;

        await this.view.moveGraph(this.view.$graphNodes[j], this.view.$graphNodes[j + 1]);
        await this.view.changeGraph(this.view.$graphNodes[j], this.view.$graphNodes[j + 1]);

      }
    }

    await this.view.changeColor(this.view.$graphNodes[storeageArray.length - i - 1]);
  }
}

Controller.prototype.handleKeyUp = function(event) {
  event.stopImmediatePropagation();

  if (event.value === '') return;

  if (event.key === 'Enter') { 
    this.view.addChildNode(event.target.value, this.model.count);
    this.model.storage.push(Number(event.target.value));
    this.$typed.value = null;
  }
}

Controller.prototype.handleBubbleClick = function(event) {
  event.stopImmediatePropagation();

  const childNodesLength = this.view.$contentContainer.childNodes.length;

  if (childNodesLength < 5) {
    this.view.$errorMessage.innerHTML = '입력 갯수가 너무 작습니다';
    return;
  }

  this.view.$errorMessage.innerHTML = '';
  this.$bubbleSortButton.style.display = 'none';
  
  this.sortStorage(this.model.storage);
}

Controller.prototype.handleRestartClick = function(event) {
  event.stopImmediatePropagation();

  this.model.storage = [];

  while (this.view.$contentContainer.hasChildNodes()) {
    this.view.$contentContainer.removeChild(this.view.$contentContainer.firstChild);
  }

  this.$bubbleSortButton.style.display = 'inline';
}

export default Controller
