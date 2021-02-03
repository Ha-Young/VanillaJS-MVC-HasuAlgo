const MergeController = function (model, view) {
  const self = this;
  self.model = model;
  self.view = view;

  // self.view.connectHandler("addNumber", function (input) {
  //   self.addNumber(input);
  // });

  // self.view.connectHandler("startSort", function () {
  //   self.startSort();
  // });

  // self.view.connectHandler("resetList", function () {
  //   self.resetList();
  // });

  // self.view.connectHandler("shuffleNum", function (array) {
  //   self.shuffleNum(array);
  // });

  // self.view.connectHandler("setRandom", function () {
  //   self.setRandom();
  // });
};

// MergeController.prototype.addNumber = function (input) {
//   const self = this;
//   const newNumber = input
//     .split(",")
//     .map((num) => parseInt(num))
//     .filter((num) => !isNaN(num));

//   if (!newNumber.length) {
//     return;
//   }

//   self.model.addNumber(newNumber, function (newList) {
//     self.view.render("paintNewList", newList);
//   });
// };

// MergeController.prototype.startSort = function () {
//   const self = this;

//   const startCompare = function (index, time) {
//     setTimeout(() => self.view.render("colorElement", index), time * 350);
//   };

//   const swapElement = function (index, element1, element2, time) {
//     setTimeout(
//       () => self.view.render("swapElement", index, element1, element2),
//       time * 350
//     );
//   };

//   const finishCompare = function (index, lastIndex, time) {
//     setTimeout(
//       () => self.view.render("uncolorElement", index, lastIndex),
//       time * 350
//     );
//   };

//   const finishSort = function (time) {
//     setTimeout(() => self.view.render("finishSort"), time * 350 + 50);
//   };

//   self.model.startSort(startCompare, swapElement, finishCompare, finishSort);
// };

// MergeController.prototype.resetList = function () {
//   const self = this;

//   self.model.resetList(() => {
//     self.view.render("paintReset");
//   });
// };

// MergeController.prototype.setRandom = function () {
//   const self = this;

//   self.model.setRandom((newList) => {
//     self.view.render("paintNewList", newList);
//   });
// };

// MergeController.prototype.shuffleNum = function () {
//   const self = this;

//   self.model.shuffleNum((shuffledArray) => {
//     self.view.render("paintNewList", shuffledArray);
//   });
// };

export default MergeController;
