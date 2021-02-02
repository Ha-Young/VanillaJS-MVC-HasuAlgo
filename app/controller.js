export const Controller = function (model, view) {
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

  self.view.connectHandler("randomNum", function () {
    self.randomNum();
  });

  self.view.connectHandler("shuffleNum", function (array) {
    self.shuffleNum(array);
  });

  self.view.connectHandler("bubbleSort", function (array) {
    self.bubbleSort(array);
  });
};

Controller.prototype.setView = function (locationHash) {
  const route = locationHash.split("/")[1];
  const page = route || "";
  this.view.render("chooseSort", page);
};

Controller.prototype.addNumber = function (input) {
  const self = this;
  const newNumber = input
    .split(",")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  self.model.addNumber(newNumber, function () {
    self.view.render("paintNewNumber", newNumber);
  });
};

Controller.prototype.startSort = function () {
  const self = this;

  const startCompare = function (index, time) {
    setTimeout(() => self.view.render("colorElement", index), time * 400);
  };

  const swapElement = function (index, element1, element2, time) {
    setTimeout(
      () => self.view.render("swapElement", index, element1, element2),
      time * 400
    );
  };

  const finishCompare = function (index, time) {
    setTimeout(() => self.view.render("uncolorElement", index), time * 400);
  };

  const finishSort = function (time) {
    setTimeout(() => self.view.render("finishSort"), time * 400 + 100);
  };

  self.model.startSort(startCompare, swapElement, finishCompare, finishSort);
};

Controller.prototype.resetList = function () {
  const self = this;

  self.model.resetList(() => {
    self.view.render("paintReset");
  });
};

Controller.prototype.randomNum = function () {
  console.log("Controller: randomNum");
};

Controller.prototype.shuffleNum = function () {
  console.log("Controller: shuffleNum");
};

Controller.prototype.bubbleSort = function () {
  console.log("Controller: bubbleSort");
};
