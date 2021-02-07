function View () {
  this.$errorMessage = document.querySelector('.errorMessage');
  this.$contentContainer = document.querySelector('.contentContainer');
  this.$contentContainer.textContent = null;
  this.indexCount = 0;
  this.paintTime = 700;
}

View.prototype.addChildNode = function(value) {
  this.$div = document.createElement('div');

  this.$div.innerHTML = value;
  this.$div.setAttribute('data-X', this.indexCount);
  this.$div.setAttribute('data-count', 0);
  this.$div.classList.add('graphNode');
  this.$div.classList.add('transition');
  this.$div.style.height = `${value * 2.5}vh`;
  this.$contentContainer.appendChild(this.$div);
  this.$graphNodes = document.getElementsByClassName('graphNode');
  this.indexCount++;
}

View.prototype.changeColor = function(leftNode, rightNode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(leftNode,rightNode);
      leftNode.style.backgroundColor = 'gray';
      rightNode.style.backgroundColor = 'gray';

      resolve();
    }, this.paintTime);
  });
}

View.prototype.moveGraph = function(leftNode, rightNode, moveValue) {
  return new Promise((resolve) => {
    setTimeout(() => {

      const left = ++leftNode.dataset.count;
      const right = --rightNode.dataset.count;

      leftNode.style.backgroundColor = 'gray';
      rightNode.style.backgroundColor = 'gray';
      leftNode.style.transform = `translateX(${left * moveValue}px)`;
      rightNode.style.transform = `translateX(${right * moveValue}px)`;

      resolve();
    }, this.paintTime);
  });
}

View.prototype.removeColor = function(leftNode, rightNode) {
  return new Promise((resovle) => {
    setTimeout(() => {
      leftNode.style.backgroundColor = 'orange';
      rightNode.style.backgroundColor = 'orange';

      resovle();
    }, this.paintTime);
  });
}

View.prototype.finishColor = function(finishNode) {
  return new Promise((resovle) => {
    setTimeout(() => {
      finishNode.style.backgroundColor = 'green';

      resovle();
    }, this.paintTime);
  });
}

export default View;
