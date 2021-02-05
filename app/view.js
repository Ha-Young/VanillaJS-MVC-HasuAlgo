function View () {
  this.$errorMessage = document.querySelector('.errorMessage');
  this.$contentContainer = document.querySelector('.contentContainer');
}

View.prototype.addChildNode = function(value) {
  this.$div = document.createElement('div');

  if (this.$contentContainer.childNodes.length > 10) {
    this.$errorMessage.innerHTML = "입력 갯수를 초과하셨습니다"
    return;
  }

  this.$div.innerHTML = value;
  this.$div.classList.add('graphNode');
  this.$div.style.height = value + 3 + 'px';
  this.$contentContainer.appendChild(this.$div);
  this.$graphNodes = document.getElementsByClassName('graphNode');
}

View.prototype.moveGraph = function moveGraph(leftNode, rightNode) { 
  leftNode.classList.add('transition');
  rightNode.classList.add('transition');
  leftNode.style.transform = 'translateX(60px)';
  rightNode.style.transform = 'translateX(-60px)';
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1300);
  });
}

View.prototype.changeGraph = function(leftNode, rightNode) {

  leftNode.classList.remove('transition');
  rightNode.classList.remove('transition');

  return new Promise((resolve) => {
    setTimeout(() => {
      leftNode.style.transform = null;
      rightNode.style.transform = null;

      setTimeout(() => {
        this.$contentContainer.insertBefore(rightNode, leftNode);
        resolve();
      }, 12);
    });
  }, 2000);
}

View.prototype.changeColor = function(node) {
  return new Promise((resolve) => {
    setTimeout(() => {

      node.style.background = 'green';
      resolve();
    }, 1000);
  });
}

export  default View
