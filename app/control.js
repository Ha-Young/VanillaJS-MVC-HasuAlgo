export default function Control(model, view) {
  this.model = model;
  this.view = view;

  const $mainForm = this.view.getElem("mainForm");
  this.view.activateEvent($mainForm, "submit", this.submitHandler.bind(this));
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
  const $viewPort = this.view.getElem("viewPort");
  const $highlighterBox = this.view.getElem("highlighterBox");

  this.view.clearElem($viewPort);
  this.view.clearElem($highlighterBox);

  const sortType = this.model.get("sortType");

  if (sortType === "bubble") {
    const inputtedNums = this.model.get("inputtedNums");

    const $barBoxes = this.view.createBarElem(inputtedNums);
    this.model.set("barBoxes", $barBoxes);
    this.view.render($viewPort ,$barBoxes);

    const $highlighters = this.view.createHighlighterElem(2);
    this.model.set("highlighters", $highlighters);
    this.view.render($highlighterBox, $highlighters);

    const barPositions = this.view.getElemPos($barBoxes);
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
  const $barBoxes = this.model.get("barBoxes");
  const barPositions = this.model.get("barPositions");
  const $highlighters = this.model.get("highlighters");

  this.view.progressBubbleSortAnimation(sortSteps, $barBoxes, $highlighters, barPositions);
};

