const Model = function () {
  this.inputArray = [];
  this.sortedArray = [];
};

Model.prototype.addNumber = function (array, callback) {
  if (this.inputArray.length > 9) {
    return;
  }

  this.inputArray = this.inputArray.concat(array);
  console.log(this.inputArray);
  callback(this.inputArray);
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
      const lastIndex = sortingArr.length - i - 1;
      startCompare(j, ++time);

      if (sortingArr[j] > sortingArr[j + 1]) {
        let temp = sortingArr[j];
        sortingArr[j] = sortingArr[j + 1];
        sortingArr[j + 1] = temp;

        swapElement(j, sortingArr[j], sortingArr[j + 1], ++time);
      }

      finishCompare(j, lastIndex, ++time);
    }
  }
  finishSort(time);
};

Model.prototype.resetList = function (callback) {
  this.inputArray = [];
  callback();
};

Model.prototype.shuffleNum = function (callback) {
  const shuffledArray = [...this.inputArray];

  for (let i = shuffledArray.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    let temp = shuffledArray[i - 1];
    shuffledArray[i - 1] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  this.inputArray = [...shuffledArray];
  callback(shuffledArray);
};

Model.prototype.setRandom = function (callback) {
  const newRandom = Math.floor(Math.random() * 50) + 1;

  this.inputArray.push(newRandom);

  callback(this.inputArray);
};

Model.prototype.removeAll = function () {};

export default Model;
