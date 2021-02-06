function Model() {
  this.storage = [];
  this.stampStorage = [];
}

Model.prototype.getStamp = function(stampType,leftIndex, rightIndex, finishIndex) {
  return {
    stampType,
    leftIndex,
    rightIndex,
    finishIndex
  }
}

export default Model;
