export default function Control(model, view) {
  this.model = model;
  this.view = view;

  this.model.set("state", { isPlaying: false });

  Control.prototype.inputHandler = function (event) {
    const state = this.model.get("state");

    if (state.isPlaying) {
      this.view.updateMessage("Sorting is already in progress.");
      return;
    }

    this.model.set("state", { isPlaying: true });

    const [inputtedNumsString, sortType] = this.view.getInputtedValue();

    const refinedNums = this.model.refineNums(inputtedNumsString);
    if (!refinedNums.isComplete) {
      this.view.updateMessage(refinedNums.message);
      this.model.set("state", { isPlaying: false });
      return;
    }

    this.model.set("refinedNums", refinedNums.value);
    this.model.set("sortType", sortType);
    this.view.updateMessage("Sort Start!");
    this.drawGraph();
  };

  Control.prototype.enterKeyDownHandler = function (event) {
    if (event.key !== "Enter") {
      return;
    }

    this.inputHandler();
  };

  this.view.activateEvent("$mainInputButton", "click", this.inputHandler.bind(this));
  this.view.activateEvent("$mainInput", "keydown", this.enterKeyDownHandler.bind(this));

  Control.prototype.drawGraph = function () {
    this.view.clearElem("$viewPort");
    this.view.clearElem("$highlighterBox");

    const refinedNums = this.model.get("refinedNums");
    this.view.createBarElem(refinedNums);

    const sortType = this.model.get("sortType");
    if (sortType === "bubble") {
      this.view.createHighlighterElem(2);
    } else if (sortType === "quick") {
      this.view.createHighlighterElem(1);
      this.view.createPivotHighlighterElem();
      this.view.createRangeHighlighterElem();
      this.view.createUpArrow();
    }

    const barPositions = this.view.getElemDomRect("$barBoxes");
    this.model.set("barPositions", barPositions);

    this.sortBars();
  };

  Control.prototype.sortBars = async function () {
    const sortType = this.model.get("sortType");
    const inputtedNums = this.model.get("refinedNums").map((refinedNum) => refinedNum.num);

    const sortSteps = (() => {
      if (sortType === "bubble") {
        return this.model.makeBubbleSortSteps(inputtedNums);
      } else if (sortType === "quick") {
        return this.model.makeQuickSortSteps(inputtedNums);
      }
    })();

    this.model.set("sortSteps", sortSteps);
    const barPositions = this.model.get("barPositions");

    if (sortType === "bubble") {
      await this.view.progressBubbleSortAnimation(sortSteps, barPositions);
    } else if (sortType === "quick") {
      await this.view.progressQuickSortAnimation(sortSteps, barPositions);
    }

    this.model.set("state", { isPlaying: false });
  };
}
