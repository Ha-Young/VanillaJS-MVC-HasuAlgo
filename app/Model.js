function Model() {
  this.sortList = [];
}

Model.prototype.getSortList = function (number) {
  if (this.sortList.length < 10) {
    this.sortList.push(number);
    return;
  }

  console.log(this.sortList);
  throw new Error("max 10 numbers!!");
}

Model.prototype.giveSortList = function () {
  return this.sortList.join(", ");
}

export const newModel = new Model();
