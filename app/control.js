export default function Control(model, view) {
  this.model = model;
  this.view = view;

  this.view.activateEvent("$mainForm", "submit", this.submitHandler.bind(this));
}

Control.prototype.submitHandler = function (event) {
  event.preventDefault();

  const MAIN_INPUT_ELEM_INDEX = 0;
  const SORT_SELECT_ELEM_INDEX = 1;
  const inputtedNumsString = event.target[MAIN_INPUT_ELEM_INDEX].value;
  const sortType = event.target[SORT_SELECT_ELEM_INDEX].value;

  const refinedNums = this.model.refineNums(inputtedNumsString);
  if (!refinedNums.isComplete) {
    this.view.updateMessage(refinedNums.message);
    return;
  }

  this.model.set("refinedNums", refinedNums.value);
  this.model.set("sortType", sortType);
  this.view.updateMessage("Sort Start!");
  this.drawGraph();
};

Control.prototype.drawGraph = function () {
  this.view.clearElem("$viewPort");
  this.view.clearElem("$highlighterBox");

  const sortType = this.model.get("sortType");

  if (sortType === "bubble") {
    const refinedNums = this.model.get("refinedNums");

    this.view.createBarElem(refinedNums);
    this.view.createHighlighterElem(2);

    const barPositions = this.view.getElemDomRect("$barBoxes");
    this.model.set("barPositions", barPositions);

    this.sortBars();
  }
};

Control.prototype.sortBars = function () {
  const sortType = this.model.get("sortType");

  const sortSteps = (() => {
    if (sortType === "bubble") {
      return this.model.makeBubbleSortProcesses();
    }
  })();

  this.model.set("sortSteps", sortSteps);
  const barPositions = this.model.get("barPositions");

  this.view.progressBubbleSortAnimation(sortSteps, barPositions);
};

