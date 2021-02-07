function Model() {
  this.storage = [];
  this.stampStorage = [];
}

Model.prototype.getStamp = function(stampType,leftIndex, rightIndex) {
  const stamp = {
    stampType,
    leftIndex,
    rightIndex,
  }

  this.stampStorage.push(stamp);
}

export default Model;
