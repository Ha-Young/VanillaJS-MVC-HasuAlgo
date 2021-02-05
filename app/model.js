function Model() {
  this.storage = [];
  this.indexCount = 0;
  this.stampStorage = [];
}

Model.prototype.getStamp = function(leftIndex, rightIndex) {
  return {
    leftIndex,
    rightIndex
  }
}

export default Model;
