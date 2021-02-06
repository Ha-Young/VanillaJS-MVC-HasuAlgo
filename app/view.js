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
  this.$div.classList.add('transition');
  this.$div.style.height = `${value + 3}px`;
  this.$contentContainer.appendChild(this.$div);
  this.$graphNodes = document.getElementsByClassName('graphNode');
  this.indexCount++;
}

View.prototype.changeColor = function(leftNode, rightNode) {
  return new Promise((resolve) => {
    setTimeout(() => {
      leftNode.style.backgroundColor = 'gray';
      rightNode.style.backgroundColor = 'gray';
    
      resolve();
    }, 700);
  });
}

View.prototype.moveGraph = function(leftNode, rightNode) {  
  return new Promise((resolve) => {
    setTimeout(() => {
    
      const left = ++leftNode.dataset.count;
      const right = --rightNode.dataset.count;

      leftNode.style.backgroundColor = 'gray';
      rightNode.style.backgroundColor = 'gray';
      leftNode.style.transform = `translateX(${left*60}px)`;
      rightNode.style.transform = `translateX(${right*60}px)`;

      resolve();
    }, 700);
  });
}

View.prototype.removeColor = function(leftNode, rightNode) {
  return new Promise((resovle) => {
    setTimeout(() => {
      leftNode.style.backgroundColor = 'orange';
      rightNode.style.backgroundColor = 'orange';

      resovle();
    }, 700);
  });
}

View.prototype.finishColor = function(finishNode) {
  return new Promise((resovle) => {
    setTimeout(() => {
      finishNode.style.backgroundColor = 'green';

      resovle();
    }, 700);
  });
}

export default View;
