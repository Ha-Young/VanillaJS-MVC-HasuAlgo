export default function NumModel (value, index, cordinateX, cordinateY, height) {
  this.value = value;
  this.index = index;
  this.height = height;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}

// FIX ME : 비구조화
NumModel.prototype.getNumRecords = function () {
  return {
    value,
    index,
    height,
    cordinateX,
    cordinateY
  } = this;
}

NumModel.prototype.setNumRecords = function (value, index, cordinateX, cordinateY) {
  this.value = value;
  this.index = index;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}