const MergeModel = function () {
  this._inputArray = [];
  this.mergedOrder = [];
};

MergeModel.prototype.addNumber = function (number, callback) {
  if (this._inputArray.length > 7) {
    return;
  }

  this._inputArray.push(number);
  callback(number, this._inputArray.length - 1);
};

MergeModel.prototype.mergeSort = async function (arr) {
  if (arr.length < 2) {
    return arr;
  }
  const length = arr.length;
  const middle = Math.floor(length / 2);
  const arrLeft = arr.slice(0, middle);
  const arrRight = arr.slice(middle);

  return await this.merge(this.mergeSort(arrLeft), this.mergeSort(arrRight));
};

MergeModel.prototype.merge = async function (left, right) {
  let temp = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      temp.push(left.shift());
    } else {
      temp.push(right.shift());
    }
  }

  const result = temp.concat(left, right);

  await new Promise((resolve) => {
    this.mergedOrder.push(result);
    resolve();
  });

  return result;
};

MergeModel.prototype.resetList = function (callback) {
  this._inputArray = [];
  callback();
};

MergeModel.prototype.shuffleNum = function (callback) {
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

MergeModel.prototype.setRandom = function (callback) {
  const newRandom = Math.floor(Math.random() * 50) + 1;

  this._inputArray.push(newRandom);

  callback(newRandom, this._inputArray.length - 1);
};

export default MergeModel;
