class Controller {
  constructor(model, view, page) {
    const self = this;

    self.model = model;
    self.view = view;
    self.page = page;

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

  setView(page) {
    const self = this;

    self.model.visualizeTask = [];
    self.model.inputArray = [];
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
      self.view.paintInput("DRAW LIST", newList);
    });
  }

  startSort() {
    const self = this;
    const sortType = self.page;

    self.model.startSort(self.startVisualize.bind(self), sortType);
  }

  async startVisualize() {
    const self = this;

    if (!self.model.visualizeTask.length) {
      return;
    }

    await self.view.renderVisualize(self.model.visualizeTask[0]);
    await self.model.visualizeTask.shift();

    await self.startVisualize();
  }

  shuffleNumber() {
    const self = this;

    self.model.shuffleNumber((shuffledArray) => {
      self.view.paintInput("DRAW LIST", shuffledArray);
    });
  }

  setRandom() {
    const self = this;

    if (self.model.inputArray.length > 9) {
      return;
    }

    self.model.setRandom((updatedList) => {
      self.view.paintInput("DRAW LIST", updatedList);
    });
  }

  resetList() {
    const self = this;

    self.model.resetList(() => {
      self.view.paintInput("RESET LIST");
    });
  }
}

export default Controller;
