import {handleBubbleClick, handleKeyUp, handleRestartClick} from './controller.js'

function View () {
  this.$typed = document.querySelector(".typed");
  this.$contentContainer = document.querySelector('.contentContainer');
  this.$bubbleSortButton = document.querySelector('.bubbleSortButton');
  this.$restartButton = document.querySelector('.restartButton');
  this.$errorMessage = document.querySelector('.errorMessage');

  this.$typed.addEventListener('keypress', handleKeyUp);
  this.$bubbleSortButton.addEventListener('click', handleBubbleClick);
  this.$restartButton.addEventListener('click', handleRestartClick);
}

View.prototype.addChildNode = function (value) {
  this.$child = document.createElement('div');

  if (this.$contentContainer.childNodes.length > 10) {
    this.$errorMessage.innerHTML = "입력 갯수를 초과하셨습니다"
    return;
  }

  this.$child.innerHTML = value;
  this.$child.classList.add('graphNode');
  this.$child.style.height = value + 5 + 'px';
  this.$contentContainer.appendChild(this.$child);
  this.$graphNodes = document.getElementsByClassName('graphNode');
  this.$graphNodes.innerHTML = value;
}

View.prototype.addSortedNode = function (number) {
}

export const view = new View();