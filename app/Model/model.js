export default function NumModel (value, index, cordinateX, cordinateY, height) {
  this.value = value;
  this.index = index;
  this.height = height;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}

// FIX ME : 비구조화
NumModel.prototype.getNumRecords = function () {
  const returnObj = {
    value : this.value,
    index : this.index,
    cordinateX : this.cordinateX,
    cordinateY : this.cordinateY,
    height : this.height
  };

  return returnObj;
}

NumModel.prototype.setNumRecords = function (value, index, cordinateX, cordinateY) {
  this.value = value;
  this.index = index;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}