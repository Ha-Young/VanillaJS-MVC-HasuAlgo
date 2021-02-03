/*

  Model은 단순히 자료구조이다. 사용자가 입력받은 자료를 받아 저장하는 역할

  sorting하기 편하게 구조를 짜야한다....

*/

export default function numModel (value, index, cordinateX, cordinateY, height) {
  this.value = value;
  this.index = index;
  this.order = index;
  this.height = height;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}

numModel.prototype.getNumRecords = function () {
  const returnObj = {
    value : this.value,
    index : this.index,
    cordinateX : this.cordinateX,
    cordinateY : this.cordinateY,
    height : this.height
  };

  return returnObj;
}

numModel.prototype.setNumRecords = function (value, index, cordinateX, cordinateY) {
  this.value = value;
  this.index = index;
  this.cordinateX = cordinateX;
  this.cordinateY = cordinateY;
}