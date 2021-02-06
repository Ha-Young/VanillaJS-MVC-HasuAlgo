function View () {
  this.$errorMessage = document.querySelector('.errorMessage');
  this.$contentContainer = document.querySelector('.contentContainer');
  this.indexCount = 0;
}

View.prototype.addChildNode = function(value) {
  this.$div = document.createElement('div');

  if (this.$contentContainer.childNodes.length > 10) {
    this.$errorMessage.innerHTML = "입력 갯수를 초과하셨습니다"
    return;
  }

  this.$div.innerHTML = value;
  this.$div.setAttribute('data-X', this.indexCount);
  this.$div.setAttribute('data-count', 0);
  this.$div.classList.add('graphNode');
  this.$div.style.height = `${value + 3}px`;
  this.$contentContainer.appendChild(this.$div);
  this.$graphNodes = document.getElementsByClassName('graphNode');
  this.indexCount++;
}

View.prototype.moveGraph = function moveGraph(leftNode, rightNode) {
  leftNode.classList.add('transition');
  rightNode.classList.add('transition');

  const left = ++leftNode.dataset.count;
  const right = --rightNode.dataset.count;

  leftNode.style.transform = `translateX(${left*60}px)`;
  rightNode.style.transform = `translateX(${right*60}px)`;
  
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

View.prototype.changeColor = function(node) {
  return new Promise((resolve) => {
    setTimeout(() => {

      node.style.background = 'green';
      resolve();
    }, 1000);
  });
}

export default View;
