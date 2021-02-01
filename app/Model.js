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
}

Model.prototype.giveSortList = function () {
  return this.sortList;
}

export const newModel = new Model();
