const MergeModel = function () {
  this._inputArray = [];
};

MergeModel.prototype.addNumber = function (number, callback) {
  if (this._inputArray.length > 7) {
    return;
  }

  this._inputArray.push(number);
  callback(number, this._inputArray.length - 1);
};

MergeModel.prototype.startSort = function () {};

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
