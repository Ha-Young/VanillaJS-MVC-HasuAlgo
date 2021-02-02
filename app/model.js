export const Model = function () {
  this.inputArray = [];
  this.sortedArray = [];
};

Model.prototype.addNumber = function (array, callback) {
  if (this.inputArray.length > 9) {
    return;
  }

  this.inputArray = this.inputArray.concat(array);
  callback();
};

Model.prototype.startSort = function (
  startCompare,
  swapElement,
  finishCompare,
  finishSort
) {
  const sortingArr = [...this.inputArray];
  let time = 0;
  for (let i = 0; i < sortingArr.length; i++) {
    for (let j = 0; j < sortingArr.length - i - 1; j++) {
      startCompare(j, ++time);

      if (sortingArr[j] > sortingArr[j + 1]) {
        let temp = sortingArr[j];
        sortingArr[j] = sortingArr[j + 1];
        sortingArr[j + 1] = temp;

        swapElement(j, sortingArr[j], sortingArr[j + 1], ++time);
      }

      finishCompare(j, ++time);
    }
  }
  finishSort(time);
};

Model.prototype.resetList = function (callback) {
  this.inputArray = [];
  callback();
};

Model.prototype.remove = function (num) {};

Model.prototype.move = function (index1, index2) {};

Model.prototype.removeAll = function () {};
