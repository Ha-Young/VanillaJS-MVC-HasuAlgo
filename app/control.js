export default function Control(model, view) {
  this.model = model;
  this.view = view;

  const $mainForm = this.view.getElem("mainForm");
  this.view.activateEvent($mainForm, "submit", this.submitHandler.bind(this));
}

Control.prototype.submitHandler = function (event) {
  event.preventDefault();

  const MAIN_INPUT_INDEX = 0;
  const SORT_SELECT_INDEX = 1;
  const inputtedNumsString = event.target[MAIN_INPUT_INDEX].value;
  const sortType = event.target[SORT_SELECT_INDEX].value;

  const refinedNums = this.model.refineNums(inputtedNumsString);
  if (!refinedNums.isComplete) {
    this.view.updateMessage(refinedNums.message);
    return;
  }

  this.model.set("inputtedNums", refinedNums.value);
  this.model.set("sortType", sortType);
  this.view.updateMessage("Sort Start!");
  this.drawGraph();
};

Control.prototype.clearViewPort = function () {
  this.view.clearViewPort();
  this.model.set("barBoxes", []);
  this.model.set("barPositions", []);
};

Control.prototype.drawGraph = function () {
  this.clearViewPort();
  const inputtedNums = this.model.get("inputtedNums");
  const $bars = this.view.createBarElem(inputtedNums);
  this.model.set("barBoxes", $bars);

  const $viewPort = this.view.getElem("viewPort");
  this.view.render($viewPort ,$bars);

  const barPositions = this.view.getElemPos($bars);
  this.model.set("barPositions", barPositions);

  this.sortBars();
};

Control.prototype.sortBars = function () {
  const sortType = this.model.get("sortType");

  const sortSteps = (() => {
    if (sortType === "bubble") {
      return this.model.makeBubbleSortProcesses();
    }
  })();
  
  this.model.set("sortSteps", sortSteps);
  const $barBoxes = this.model.get("barBoxes");
  const barPositions = this.model.get("barPositions");

  this.view.progressBubbleSortAnimation(sortSteps, $barBoxes, barPositions);
};

