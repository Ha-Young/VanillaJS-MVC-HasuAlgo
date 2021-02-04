const QuickModel = function () {
  this._inputArray = [];
};

QuickModel.prototype.addNumber = function (array, callback) {
  if (this._inputArray.length > 9) {
    return;
  }

  this._inputArray = this._inputArray.concat(array);
  callback(this._inputArray);
};

QuickModel.prototype.startSort = async function (
  startCompare,
  swapElement,
  finishCompare,
  finishSort
) {
  const sortingArr = [...this._inputArray];
  for (let i = 0; i < sortingArr.length; i++) {
    for (let j = 0; j < sortingArr.length - i - 1; j++) {
      const lastIndex = sortingArr.length - i - 1;
      await startCompare(j);

      if (sortingArr[j] > sortingArr[j + 1]) {
        let temp = sortingArr[j];
        sortingArr[j] = sortingArr[j + 1];
        sortingArr[j + 1] = temp;

        await swapElement(j, sortingArr[j], sortingArr[j + 1]);
      }

      await finishCompare(j, lastIndex);
    }
  }
  await finishSort();
};

QuickModel.prototype.resetList = function (callback) {
  this._inputArray = [];
  callback();
};

QuickModel.prototype.shuffleNum = function (callback) {
  const shuffledArray = [...this._inputArray];

  for (let i = shuffledArray.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    let temp = shuffledArray[i - 1];
    shuffledArray[i - 1] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  this._inputArray = [...shuffledArray];
  callback(shuffledArray);
};

QuickModel.prototype.setRandom = function (callback) {
  const newRandom = Math.floor(Math.random() * 50) + 1;

  this._inputArray.push(newRandom);

  callback(this._inputArray);
};

export default QuickModel;
