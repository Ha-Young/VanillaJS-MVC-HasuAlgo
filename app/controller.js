class Controller {
  constructor(model, view, page) {
    const self = this;

    self.model = model;
    self.view = view;
    self.page = page;

    self.view.connectHandler("addNumber", function (input) {
      self.addNumberControl(input);
    });

    self.view.connectHandler("startSort", function () {
      self.startSortControl();
    });

    self.view.connectHandler("shuffleNumber", function () {
      self.shuffleNumberControl();
    });

    self.view.connectHandler("setRandom", function () {
      self.setRandomControl();
    });

    self.view.connectHandler("resetList", function () {
      self.resetListControl();
    });
  }

  setViewControl(page) {
    const self = this;

    self.model.initialize();
    self.view.paintPage(page);
  }

  addNumberControl(input) {
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

    if (self.page === "merge") {
      self.model.setNewNumber(newNumber, function (newList) {
        self.view.paintInput("DRAW BOX", newList);
      });
      return;
    }

    self.model.setNewNumber(newNumber, function (newList) {
      self.view.paintInput("DRAW LIST", newList);
    });
  }

  startSortControl() {
    const self = this;
    const sortType = self.page;

    self.model.startSort(self.startVisualize.bind(self), sortType);
  }

  async startVisualize() {
    const self = this;

    if (!self.model.visualizeTask.length) {
      return;
    }

    await self.view.renderVisualize(self.model.visualizeTask[0], self.page);
    await self.model.visualizeTask.shift();

    await self.startVisualize();
  }

  shuffleNumberControl() {
    const self = this;

    self.model.setShuffleNumber((shuffledArray) => {
      self.view.paintInput("DRAW LIST", shuffledArray);
    });
  }

  setRandomControl() {
    const self = this;

    if (self.model.inputArray.length > 9) {
      return;
    }

    self.model.setRandomNumber((updatedList) => {
      self.view.paintInput("DRAW LIST", updatedList);
    });
  }

  resetListControl() {
    const self = this;

    self.model.resetList(() => {
      self.view.paintInput("RESET LIST");
    });
  }
}

export default Controller;
