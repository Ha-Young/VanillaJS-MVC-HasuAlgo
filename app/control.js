export default function Control(model, view) {
  this.model = model;
  this.view = view;
  
  this.keys = {
    state: "state",
    barPositions: "barPositions",
    refinedNums: "refinedNums",
    sortType: "sortType",
  };

  this.elems = {
    $mainInputButton: "$mainInputButton",
    $mainInput: "$mainInput",
    $viewPort: "$viewPort",
    $highlighterBox: "$highlighterBox",
    $barBoxes: "$barBoxes",
  };

  this.model.set(this.keys.state, { isPlaying: false });
  
  Control.prototype.inputHandler = async function (event) {
    const state = this.model.get(this.keys.state);

    if (state.isPlaying) {
      this.view.updateMessage("Sorting is already in progress.");
      return;
    }

    this.model.set(this.keys.state, { isPlaying: true });

    const {inputtedNumsString, sortType} = this.view.getInputtedValue();

    const refinedNums = this.refineNums(inputtedNumsString);
    if (!refinedNums.isComplete) {
      this.view.updateMessage(refinedNums.message);
      this.model.set(this.keys.state, { isPlaying: false });
      return;
    }

    this.model.set(this.keys.refinedNums, refinedNums.value);
    this.model.set(this.keys.sortType, sortType);
    this.view.updateMessage("Sort start!");
    await this.drawGraph();
    this.visualizeSort();
  };

  Control.prototype.enterKeyDownHandler = function (event) {
    if (event.key !== "Enter") {
      return;
    }

    this.inputHandler();
  };

  this.view.activateEvent(this.elems.$mainInputButton, "click", this.inputHandler.bind(this));
  this.view.activateEvent(this.elems.$mainInput, "keydown", this.enterKeyDownHandler.bind(this));

  Control.prototype.drawGraph = async function () {
    this.view.clearElem(this.elems.$viewPort);
    this.view.clearElem(this.elems.$highlighterBox);

    const refinedNums = this.model.get(this.keys.refinedNums);
    this.view.createBarElem(refinedNums);

    const sortType = this.model.get(this.keys.sortType);
    if (sortType === "bubble") {
      this.view.createHighlighterElem(2);
    } else if (sortType === "quick") {
      this.view.createHighlighterElem(1);
      this.view.createPivotHighlighterElem();
      this.view.createRangeHighlighterElem();
      this.view.createUpArrow();
    }

    const barPositions = this.view.getElemDomRect(this.elems.$barBoxes);
    this.model.set(this.keys.barPositions, barPositions);
  };

  Control.prototype.visualizeSort = async function () {
    const sortType = this.model.get(this.keys.sortType);
    const inputtedNums = this.model.get(this.keys.refinedNums).map((refinedNum) => refinedNum.num);

    const sortSteps = (() => {
      if (sortType === "bubble") {
        return this.makeBubbleSortSteps(inputtedNums);
      } else if (sortType === "quick") {
        return this.makeQuickSortSteps(inputtedNums);
      }
    })();

    this.model.set("sortSteps", sortSteps);
    const barPositions = this.model.get("barPositions");

    if (sortType === "bubble") {
      await this.view.progressBubbleSortAnimation(sortSteps, barPositions);
    } else if (sortType === "quick") {
      await this.view.progressQuickSortAnimation(sortSteps, barPositions);
    }

    this.model.set(this.keys.state, { isPlaying: false });
    this.view.updateMessage("Sort complete!");
  };

  Control.prototype.refineNums = function (nums) {
    const refinedNums = nums
      .replace(/ /g, "")
      .split(",")
      .map((numString) => parseInt(numString, 10))
      .filter((num) => num);

    if (refinedNums.length < 5 || refinedNums.length > 10) {
      return {
        isComplete: false,
        message: "Please enter 5 to 10 numbers.",
      };
    }

    if (!refinedNums.every((num) => num > 0 && num < 1000)) {
      return {
        isComplete: false,
        message: "Please input numbers greater than 0 and less than 1000",
      };
    }

    const tempNums = Array.from(refinedNums);
    const sortedNumsIndex = [
      ...new Set(
        tempNums.sort(
          (a, b) => a - b
        )
      )
    ].reduce((numsIndex, num, i) => {
      numsIndex[num] = i;
      return numsIndex;
    }, {});

    const max = Math.max(...refinedNums);

    const resultValue = refinedNums.map((num, i) => ({
        num,
        max,
        sortedIndex: sortedNumsIndex[num],
        percentage: Math.round(num / max * 100),
      })
    );

    return {
      isComplete: true,
      value: resultValue
    };
  };

  Control.prototype.swapItems = function (arr, aIndex, bIndex) {
    [arr[aIndex], arr[bIndex]] = [arr[bIndex], arr[aIndex]];
  };

  Control.prototype.makeBubbleSortSteps = function (inputtedNums) {
    const sortSteps = [];

    for (let i = 0; i < inputtedNums.length - 1; i++) {
      for (let j = 0; j < inputtedNums.length - 1 - i; j++) {

        const currentValue = inputtedNums[j];
        const nextValue = inputtedNums[j + 1];

        if (currentValue > nextValue) {
          this.swapItems(inputtedNums, j, j + 1);

          sortSteps.push({
            shouldSwap: true,
            currentValue,
            nextValue,
            currentIndex: j,
            nextIndex: j + 1,
          });
        } else {
          sortSteps.push({
            shouldSwap: false,
            currentValue,
            nextValue,
            currentIndex: j,
            nextIndex: j + 1,
          });
        }
      }
    }

    return sortSteps;
  };

  Control.prototype.getIndexForQuickSort = function (inputtedNums, start, end) {
    const sortSteps = [];
    const pivotIndex = end;
    const pivotValue = inputtedNums[pivotIndex];

    let nextPivotIndex = start;
    let currentIndex = start;

    while (currentIndex < end) {
      const shouldSwap = inputtedNums[currentIndex] < pivotValue;

      if (shouldSwap) {
        this.swapItems(inputtedNums, currentIndex, nextPivotIndex);
      }

      sortSteps.push(
        {
          start,
          end,
          pivotValue,
          pivotIndex,
          nextPivotIndex,
          currentIndex,
          shouldSwap,
          isEnd: false,
        }
      );

      if (shouldSwap) {
        nextPivotIndex++;
      }

      currentIndex++;
    }

    this.swapItems(inputtedNums, pivotIndex, nextPivotIndex);
    sortSteps.push(
      {
        start,
        end,
        pivotValue,
        pivotIndex,
        nextPivotIndex,
        currentIndex,
        shouldSwap: true,
        isEnd: true,
      }
    );

    return [nextPivotIndex, sortSteps];
  };

  Control.prototype.makeQuickSortSteps = function (inputtedNums, start = 0, end = inputtedNums.length - 1) {
    if (start >= end) {
      return [];
    }

    const [prevPivotIndex, sortSteps] = this.getIndexForQuickSort(inputtedNums, start, end);

    const leftArrSteps = this.makeQuickSortSteps(inputtedNums, start, prevPivotIndex - 1);
    const rightArrSteps = this.makeQuickSortSteps(inputtedNums, prevPivotIndex + 1, end);

    let resultSteps = [];
    resultSteps = resultSteps.concat(sortSteps, leftArrSteps, rightArrSteps);

    return resultSteps;
  };
}
