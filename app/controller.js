class Controller {
  constructor(model, view) {
    const self = this;

    self.model = model;
    self.view = view;

    self.view.connectHandler("addNumber", function (input) {
      self.addNumber(input);
    });

    self.view.connectHandler("startSort", function () {
      self.startSort();
    });

    self.view.connectHandler("shuffleNumber", function () {
      self.shuffleNumber();
    });

    self.view.connectHandler("setRandom", function () {
      self.setRandom();
    });

    self.view.connectHandler("resetList", function () {
      self.resetList();
    });
  }

  setView(locationHash) {
    const self = this;
    const route = locationHash.split("/")[1];
    const page = route || "";

    self.sortStyle = page;
    self.view.setSortStyle(page);
  }

  addNumber(input) {
    const self = this;

    if (!input || self.model.inputArray.length > 9) {
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
  }

  startSort() {
    const self = this;

    self.model.startSort(self.startVisualize.bind(self));
  }

  async startVisualize() {
    const self = this;

    if (!self.model.taskQueue.length) {
      return;
    }

    await self.view.renderVisualize(self.model.taskQueue[0]);
    await self.model.taskQueue.shift();

    await self.startVisualize();
  }

  shuffleNumber() {
    const self = this;

    self.model.shuffleNumber((shuffledArray) => {
      self.view.renderInput("DRAW LIST", shuffledArray);
    });
  }

  setRandom() {
    const self = this;

    if (self.model.inputArray.length > 9) {
      return;
    }

    self.model.setRandom((updatedList) => {
      self.view.renderInput("DRAW LIST", updatedList);
    });
  }

  resetList() {
    const self = this;

    self.model.resetList(() => {
      self.view.renderInput("RESET");
    });
  }
}

export default Controller;
