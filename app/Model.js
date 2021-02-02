function Model() {
  this.sortList = [];
}

Model.prototype.getSortList = function (number) {
  if (!number) {
    return;
  }

  if (this.sortList.length < 10) {
    this.sortList.push(number);
    return;
  }

  throw new Error("max 10 numbers!!");
};

Model.prototype.giveSortList = function () {
  return this.sortList;
};

Model.prototype.changeListOrder = function (left, right) {
  const temp = this.sortList[left];

  this.sortList[left] = this.sortList[right];
  this.sortList[right] = temp;
  console.log(this.sortList);
};

export const model = new Model();
