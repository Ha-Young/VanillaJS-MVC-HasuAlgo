import { forOwn } from "lodash";

const MergeController = function (model, view) {
  const self = this;
  self.model = model;
  self.view = view;

  self.view.connectHandler("addNumber", function (input) {
    self.addNumber(input);
  });

  self.view.connectHandler("startSort", function () {
    self.startSort();
  });

  self.view.connectHandler("resetList", function () {
    self.resetList();
  });

  self.view.connectHandler("setRandom", function () {
    self.setRandom();
  });

  self.view.connectHandler("shuffleNum", function () {
    self.shuffleNum();
  });
};

MergeController.prototype.addNumber = function (input) {
  const self = this;
  const newNumbers = input
    .split(",")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  if (!newNumbers.length) {
    return;
  }

  for (const number of newNumbers) {
    self.model.addNumber(number, function (newNumber, index) {
      self.view.render("paintNewNumber", newNumber, index);
    });
  }
};

MergeController.prototype.startSort = async function () {
  const self = this;

  const divide = function (turn) {
    return new Promise((resolve) => {
      setTimeout(() => {
        self.view.render("divide", turn);
        resolve();
      }, 300);
    });
  };

  for (let i = 1; i < 4; i++) {
    await divide(i);
  }

  self.model.mergeSort(self.model._inputArray).then(console.log);
};

MergeController.prototype.resetList = function () {
  const self = this;

  self.model.resetList(() => {
    self.view.render("paintReset");
  });
};

MergeController.prototype.setRandom = function () {
  const self = this;

  const newRandom = Math.floor(Math.random() * 99) + 1;

  self.model.addNumber(newRandom, function (newRandom, index) {
    self.view.render("paintNewNumber", newRandom, index);
  });
};

MergeController.prototype.shuffleNum = function () {
  const self = this;

  self.model.shuffleNum((shuffledArray) => {
    for (let i = 0; i < shuffledArray.length; i++) {
      self.view.render("paintNewNumber", shuffledArray[i], i);
    }
  });
};

export default MergeController;
