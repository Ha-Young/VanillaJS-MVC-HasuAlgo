const MergeModel = function () {
  this._inputArray = [];
};

// MergeModel.prototype.addNumber = function (array, callback) {
//   if (this._inputArray.length > 9) {
//     return;
//   }

//   this._inputArray = this._inputArray.concat(array);
//   callback(this._inputArray);
// };

// MergeModel.prototype.startSort = function (
//   startCompare,
//   swapElement,
//   finishCompare,
//   finishSort
// ) {
//   const sortingArr = [...this._inputArray];
//   let time = 0;
//   for (let i = 0; i < sortingArr.length; i++) {
//     for (let j = 0; j < sortingArr.length - i - 1; j++) {
//       const lastIndex = sortingArr.length - i - 1;
//       startCompare(j, ++time);

//       if (sortingArr[j] > sortingArr[j + 1]) {
//         let temp = sortingArr[j];
//         sortingArr[j] = sortingArr[j + 1];
//         sortingArr[j + 1] = temp;

//         swapElement(j, sortingArr[j], sortingArr[j + 1], ++time);
//       }

//       finishCompare(j, lastIndex, ++time);
//     }
//   }
//   finishSort(time);
// };

// MergeModel.prototype.resetList = function (callback) {
//   this._inputArray = [];
//   callback();
// };

// MergeModel.prototype.shuffleNum = function (callback) {
//   const shuffledArray = [...this._inputArray];

//   for (let i = shuffledArray.length; i; i--) {
//     const j = Math.floor(Math.random() * i);
//     let temp = shuffledArray[i - 1];
//     shuffledArray[i - 1] = shuffledArray[j];
//     shuffledArray[j] = temp;
//   }

//   this._inputArray = [...shuffledArray];
//   callback(shuffledArray);
// };

// MergeModel.prototype.setRandom = function (callback) {
//   const newRandom = Math.floor(Math.random() * 50) + 1;

//   this._inputArray.push(newRandom);

//   callback(this._inputArray);
// };

export default MergeModel;
