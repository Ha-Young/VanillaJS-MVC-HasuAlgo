class Controller {
  constructor(model, view) {
    const self = this;

    self.model = model;
    self.view = view;
    self.page;

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

  setViewControl() {
    const self = this;

    self.model.initialize();
    self.view.paintPage();
  }

  addNumberControl(input) {
    const self = this;

    if (!input || self.model.inputArray.length > 9) {
      return;
    }

    const newNumbers = input
      .split(",")
      .map((num) => parseInt(num))
      .filter((num) => !isNaN(num));

    if (!newNumbers.length) {
      return;
    }

    if (self.page === "merge") {
      for (const number of newNumbers)
        self.model.setNewNumber(newNumbers, function () {
          self.view.paintInput("DRAW BOX", number);
        });
      return;
    }

    self.model.setNewNumber(newNumbers, function (newList) {
      self.view.paintInput("DRAW LIST", newList);
    });
  }

  startSortControl() {
    const self = this;
    const sortType = self.page;

    self.model.startSort(() => {
      self.startVisualizeControl();
    }, sortType);
  }

  async startVisualizeControl() {
    const self = this;

    if (!self.model.visualizeTask.length) {
      return;
    }

    await self.view.renderVisualize(self.model.visualizeTask[0], self.page);
    await self.model.visualizeTask.shift();

    await self.startVisualizeControl();
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
