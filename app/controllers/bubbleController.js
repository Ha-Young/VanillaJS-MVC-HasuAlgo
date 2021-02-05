const BubbleControlle = function (model, view) {
  const self = this;
  self.model = model;
  self.view = view;

  self.view.connectHandler("addNumber", function (input) {
    self.addNumber(input);
  });

  self.view.connectHandler("startSort", function () {
    self.startSort();
  });

  self.view.connectHandler("shuffleNum", function (array) {
    self.shuffleNum(array);
  });

  self.view.connectHandler("setRandom", function () {
    self.setRandom();
  });

  self.view.connectHandler("resetList", function () {
    self.resetList();
  });
};

BubbleControlle.prototype.addNumber = function (input) {
  const self = this;

  if (!input) {
    return;
  }

  const newNumber = input
    .split(",")
    .map((num) => parseInt(num))
    .filter((num) => !isNaN(num));

  if (!newNumber.length) {
    return;
  }

  self.model.addNumber(newNumber, function (newList) {
    self.view.renderInput("DRAW LIST", newList);
  });
};

BubbleControlle.prototype.startSort = function () {
  const self = this;

  self.model.startSort(self.startVisualize.bind(self));
};

BubbleControlle.prototype.startVisualize = async function () {
  const self = this;

  if (!self.model.taskQueue.length) {
    return;
  }

  await self.view.renderVisualize(self.model.taskQueue[0]);
  await self.model.taskQueue.shift();

  await self.startVisualize();
};

BubbleControlle.prototype.shuffleNum = function () {
  const self = this;

  self.model.shuffleNum((shuffledArray) => {
    self.view.renderInput("DRAW LIST", shuffledArray);
  });
};

BubbleControlle.prototype.setRandom = function () {
  const self = this;
  const randomNum = Math.floor(Math.random() * 50) + 1;

  self.model.setRandom(randomNum, (updatedList) => {
    self.view.renderInput("DRAW LIST", updatedList);
  });
};

BubbleControlle.prototype.resetList = function () {
  const self = this;

  self.model.resetList(() => {
    self.view.renderInput("RESET");
  });
};

export default BubbleControlle;
