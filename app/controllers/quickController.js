const QuickController = function (model, view) {
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

  self.view.connectHandler("shuffleNum", function (array) {
    self.shuffleNum(array);
  });

  self.view.connectHandler("setRandom", function () {
    self.setRandom();
  });
};

QuickController.prototype.addNumber = function (input) {
  const self = this;
  const newNumber = input
    .split(",")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  if (!newNumber.length) {
    return;
  }

  self.model.addNumber(newNumber, function (newList) {
    self.view.render("paintNewList", newList);
  });
};

QuickController.prototype.startSort = function () {
  const self = this;

  const startCompare = function (index) {
    return new Promise((resolve) => {
      setTimeout(() => {
        self.view.render("colorElement", index);
        resolve();
      }, 350);
    });
  };

  const swapElement = function (index, element1, element2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        self.view.render("swapElement", index, element1, element2);
        resolve();
      }, 350);
    });
  };

  const finishCompare = function (index, lastIndex) {
    return new Promise((resolve) => {
      setTimeout(() => {
        self.view.render("uncolorElement", index, lastIndex);
        resolve();
      }, 350);
    });
  };

  const finishSort = function () {
    self.view.render("finishSort");
  };

  self.model.startSort(startCompare, swapElement, finishCompare, finishSort);
};

QuickController.prototype.resetList = function () {
  const self = this;

  self.model.resetList(() => {
    self.view.render("paintReset");
  });
};

QuickController.prototype.setRandom = function () {
  const self = this;

  self.model.setRandom((newList) => {
    self.view.render("paintNewList", newList);
  });
};

QuickController.prototype.shuffleNum = function () {
  const self = this;

  self.model.shuffleNum((shuffledArray) => {
    self.view.render("paintNewList", shuffledArray);
  });
};

export default QuickController;
