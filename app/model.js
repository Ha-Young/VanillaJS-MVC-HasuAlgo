function Model() {
  this.storage = [];
  this.indexCount = 0;
  this.stampStorage = [];
}

Model.prototype.getStamp = function(leftIndex, rightIndex, finishIndex) {
  return {
    leftIndex,
    rightIndex,
    finishIndex
  }
}

export default Model;
