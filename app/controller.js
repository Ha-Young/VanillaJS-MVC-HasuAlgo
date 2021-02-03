export default class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.isRunning = false;
    view.addEvent(view.$inputNumber, "input", this.handleEvent.bind(this));
    view.addEvent(view.$selectSort, "input", this.handleEvent.bind(this));
    view.addEvent(view.$buttonRun, "click", this.handleEvent.bind(this));
    view.addEvent(view.$mainAnimation, "transitionend", this.handleEvent.bind(this));
  }

  handleEvent(event) {
    const self = this;

    switch (event.type) {
      case "click":
        const hasNewUserInput =  !!self.model._temp.userInputs;

        if (self.isRunning && hasNewUserInput) {
          self.isRunning = false;
          self.model.clearData(function() {
            self.view.render("clear");
          });
        }
        if (self.isRunning && !hasNewUserInput) return;

        self.isRunning = true;
        self.model.saveData(function (sortType, sortingData) {
          self.view.render("init", sortType, sortingData);
        });
        self.view.clearInput();
        break;

      case "input":
        if (event.target.className === "select-sort") {
          self.model._temp.userSort = event.target.value;
          return;
        }

        const inputValue = event.target.value.slice(-1);
        const isNumber = typeof +inputValue === "number" && !Number.isNaN(+inputValue);
        const isCommaOrSpace = inputValue === "," || inputValue === " ";

        if (!isNumber && !isCommaOrSpace) {
          const invalidValue = event.target.value;
          event.target.value = invalidValue.slice(0, invalidValue.length - 1);
          return;
        }

        self.model._temp.userInputs = event.target.value;
        break;

      case "transitionend":
        const userSort = self.model._storage.userSort;
        self.model._sort(userSort, function(sortType, changedIndex) {
          self.view.render("change", sortType, null, changedIndex);
        });
    }

  }
}
