export default function Control(model, view) {
  this.model = model;
  this.view = view;

  this.view.activateEvent("mainForm", "submit", (function (event) {
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
    this.drawGraph();
    this.view.updateMessage("Sort Start!")
  }).bind(this))
}

Control.prototype.clearViewPort = function () {
  this.view.clearViewPort();
  this.model.set("barBoxes", []);
  this.model.set("barPos", []);
}

Control.prototype.drawGraph = function () {
  this.clearViewPort();
  const inputtedNums = this.model.get("inputtedNums");
  const $bars = this.view.createBarElem(inputtedNums);
  this.model.set("barBoxes", $bars);

  const $viewPort = this.view.getElem("viewPort");
  this.view.render($viewPort ,$bars);

  const barPos = this.view.getElemPos($bars);
  this.model.set("barPos", barPos);

  this.startSort();
}

Control.prototype.startSort = function () {
  const sortType = this.model.get("sortType");

  if (sortType === "bubble") {
    this.sortWithBubble();
  }
}

Control.prototype.sortWithBubble = function () {
  const sortProcesses = this.model.makeBubbleSortProcesses();
  
  this.view.startAnimation(sortProcesses);
}

Control.prototype.swapBars = function ($a, $b) {
  const $barBoxes = this.model.get("barBoxes");
  const $domRects = this.model.get("barPos");
  // const first = $barBoxes[0];
  // const second = $barBoxes[1];
  // const firstDomRect = $domRects[0];
  // const secondDomRect = $domRects[1];

  this.view.swapElem(first, second, firstDomRect, secondDomRect);

}
