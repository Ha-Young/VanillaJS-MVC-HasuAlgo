function Model() {
  this.storage = [];
  this.stampStorage = [];
}

Model.prototype.getStamp = function(stampType,leftIndex, rightIndex, finishIndex) {
  const stamp = {
    stampType,
    leftIndex,
    rightIndex,
    finishIndex
  }

  this.stampStorage.push(stamp);
}

export default Model;
