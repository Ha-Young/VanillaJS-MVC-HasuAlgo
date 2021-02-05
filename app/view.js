export default function View() {
  this.$selectSortType = document.querySelector(".select-sort-type");
  this.$mainInputBox = document.querySelector(".main-input-box")
  this.$mainInput = document.querySelector(".main-input");
  this.$mainInputButton = document.querySelector(".main-input-button");
  this.$viewPortBox = document.querySelector(".view-port-box");
  this.$viewPort = document.querySelector(".view-port");
  this.$highlighterBox = document.querySelector(".highlighter-box");
  this.$messageBox = document.querySelector(".message-box");

  this.VIEW_PORT_HEIGHT = 270;

  View.prototype.getElem = function (elemName, selectAll = false) {
    if (!selectAll && this[elemName]) {
      return this[elemName];
    }

    if (!selectAll) {
      return document.querySelector(elemName);
    }

    return document.querySelectorAll(elemName);
  };

  View.prototype.activateEvent = function (eventTarget, event, handler) {
    if (!typeof handler === "function") {
      throw new Error("The handler argument is not a function.");
    }

    const $eventTarget = this.getElem(eventTarget);

    $eventTarget.addEventListener(event, handler);
  };

  View.prototype.getInputtedValue = function () {
    return [this.$mainInput.value, this.$selectSortType.value];
  };

  View.prototype.clearElem = function (target) {
    const $target = this.getElem(target);

    $target.innerHTML = "";
  };

  View.prototype.updateMessage = function (message) {
    this.$messageBox.textContent = message;
  };

  View.prototype.createElement = function (template) {
    const $newElem = document.createElement("template");
    $newElem.innerHTML = template;
    return $newElem.content.firstChild;
  };

  View.prototype.render = function ($parentNode, $target) {
    if (Array.isArray($target)) {
      for (const $targetItem of $target) {
        $parentNode.append($targetItem);
      }

      return;
    }

    $parentNode.append($target);
  };

  View.prototype.createHighlighterElem = function (num) {
    const $highlighters = [];

    for (let i = 0; i < num; i++) {
      const template =
        `<div class="highlighter" data-idx="${i}"></div>`;

      $highlighters.push(this.createElement(template));
    }

    this.$highlighters = $highlighters;
    this.render(this.$highlighterBox, $highlighters);
  };

  View.prototype.createRangeHighlighterElem = function () {
    const template =
      `<div class="range-highlighter"></div>`;

    this.$rangeHighlighter = this.createElement(template);
    this.addClassName(this.$rangeHighlighter, "range-highlighter");

    this.render(this.$highlighterBox, this.$rangeHighlighter);
  };

  View.prototype.createBarElem = function (refinedNums) {
    const $barBoxes = refinedNums.map(
      (num) => {
        const template =
          `<div class="bar-box" data-idx="${num.sortedIndex}">
            <div class="bar"></div>
            <div class="number">${num.num}</div>
          </div>`;

        const $barBox = this.createElement(template);

        const barHeight = (() => {
          const height =  Math.round(this.VIEW_PORT_HEIGHT * (num.percentage / 100));
          if (!height) {
            return 1;
          }

          return height;
        })();

        $barBox.children[0].style.height =
          `${barHeight}px`;

        return $barBox;
      }
    );

    this.$barBoxes = $barBoxes;

    this.render(this.$viewPort, $barBoxes)
  };

  View.prototype.getElemDomRect = function(target) {
    const $target = this.getElem(target);

    if (Array.isArray($target)) {
      return $target.map(
        (elem, i) => {
          const rect = elem.getBoundingClientRect()
          rect.originalIndex = i;

          return rect;
        }
      );
    }

    return $target.getBoundingClientRect();
  };

  View.prototype.moveElem = function ($target, destinationPostion, skipX = false, skipY = false, offsetX = 0, offsetY = 0) {
    const targetMatrix = new WebKitCSSMatrix(getComputedStyle($target).transform);
    
    const currentPosition = $target.getBoundingClientRect();

    const movedXValue = targetMatrix.m41;
    const movedYValue = targetMatrix.m42;

    const xValueToMove = destinationPostion ? destinationPostion.left - currentPosition.left : 0;
    const yValueToMove = destinationPostion ? destinationPostion.top - currentPosition.top : 0;

    const xMovingValue = skipX ? movedXValue + offsetX : movedXValue + offsetX + xValueToMove;
    const yMovingValue = skipY ? movedYValue + offsetY : movedYValue + offsetY + yValueToMove;
  
    $target.style.transform = `translate(${xMovingValue}px, ${yMovingValue}px)`;
  };

  View.prototype.swapElem = function ($a, $b, indexA, indexB, elemPositions, skipX = false, skipY = false) {
    const destinationA = elemPositions[indexB];
    const destinationB = elemPositions[indexA];

    this.moveElem($a, destinationA, skipX, skipY);
    this.moveElem($b, destinationB, skipX, skipY);
  };

  View.prototype.addClassName = function ($target, className) {
    if (typeof className !== "string") {
      throw new Error("The className argument is not a string");
    }

    if (Array.isArray($target)) {
      for (const $targetItem of $target) {
        $targetItem.classList.add(className);
      }

      return;
    }

    $target.classList.add(className);
  };

  View.prototype.removeClassName = function ($target, className) {
    if (typeof className !== "string") {
      throw new Error("The className argument is not a string");
    }

    if (Array.isArray($target)) {
      for (const $targetItem of $target) {
        $targetItem.classList.remove(className);
      }

      return;
    }

    $target.classList.remove(className);
  };

  View.prototype.changeArrowColor = function ($arrow, color) {
    $arrow.children[0].style.borderColor = color;
  };

  View.prototype.createPivotHighlighterElem = function () {
    const template =
      `<div class="pivot-highlighter"></div>`;

    const $pivotHighlighter = this.createElement(template);
    this.$pivotHighlighter = $pivotHighlighter;

    this.render(this.$highlighterBox, $pivotHighlighter);
  };

  View.prototype.createUpArrow = function () {
    const template =
      `<div class="arrow"><i class="arrow-up"></i></div>`;

    const $upArrow = this.createElement(template);
    this.$upArrow = $upArrow;

    this.render(this.$highlighterBox, $upArrow);
  };

  View.prototype.moveAndLengthenHighlighter = function ($highlighter, start, end, barPositions) {
    const startPosition = barPositions[start];
    const endPosition = barPositions[end];
    const PADDING = 10;

    const barWidth =
      parseInt(
        getComputedStyle(
          this.$barBoxes[0].children[1])
        .width.replace("px",""),
      10);

    const distance = endPosition.x - startPosition.x;
    this.moveElem($highlighter, startPosition, false, true, PADDING * 1.5 * -1);

    $highlighter.style.width = `${distance + barWidth + PADDING * 3}px`;
  };

  View.prototype.waitTime = function (waitingTime) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, waitingTime);
    });
  };

  View.prototype.addJumpAnimation = async function ($elem) {
    this.moveElem($elem,null, true, false, 0, -50);
    await this.waitTime(500);
    this.moveElem($elem,null, true, false, 0, 50);
    await this.waitTime(500);
  };

  View.prototype.progressBubbleSortAnimation = async function (sortSteps, barPositions) {
    const $highlighterA = this.$highlighters[0];
    const $highlighterB = this.$highlighters[1];

    for (const step of sortSteps) {
      const indexA = step.indexA;
      const indexB = step.indexB;

      if (step.shouldSwap) {
        this.addClassName([$highlighterA, $highlighterB], "should-swap");
      } else {
        this.removeClassName([$highlighterA, $highlighterB], "should-swap");
      }

      const highlighterADestination = barPositions[indexA];
      const highlighterBDestination = barPositions[indexB];

      this.moveElem($highlighterA ,highlighterADestination, false, true);
      this.moveElem($highlighterB ,highlighterBDestination, false, true);
      await this.waitTime(500);


      if (step.shouldSwap) {
        const $barBoxA = this.$barBoxes[indexA];
        const $barBoxB = this.$barBoxes[indexB];

        [this.$barBoxes[indexA], this.$barBoxes[indexB]] = [this.$barBoxes[indexB], this.$barBoxes[indexA]];
        this.swapElem($barBoxA, $barBoxB, indexA, indexB, barPositions, false, true);
        await this.waitTime(500);
      }
    }

    this.removeClassName([$highlighterA, $highlighterB], "should-swap");
  };

  View.prototype.progressQuickSortAnimation = async function (sortSteps, barPositions) {
    const $currentIndexHighlighter = this.$upArrow;
    const $nextPivotIndexHighlighter = this.$highlighters[0];
    const $rangeHighlighter = this.$rangeHighlighter;
    const $pivotHighlighter = this.$pivotHighlighter;

    this.addClassName($nextPivotIndexHighlighter, "quick-next-pivot-index-highlighter");

    this.moveElem($currentIndexHighlighter, barPositions[0], false, true);
    this.moveElem($nextPivotIndexHighlighter, barPositions[0], false, true);
    this.moveElem($pivotHighlighter, barPositions[barPositions.length - 1], false, true, -14, 0);
    this.moveAndLengthenHighlighter($rangeHighlighter, 0, barPositions.length - 1, barPositions);
    await this.waitTime(500);

    for (const [i, step] of sortSteps.entries()) {
      const pivotIndex = step.pivotIndex;
      const currentIndex = step.currentIndex;
      const nextPivotIndex = step.nextPivotIndex;
      const shouldSwap = step.shouldSwap;
      const isEnd = step.isEnd;

      this.moveAndLengthenHighlighter($rangeHighlighter, step.start, step.end, barPositions);
      this.moveElem($nextPivotIndexHighlighter, barPositions[nextPivotIndex], false, true);
      this.moveElem($pivotHighlighter, barPositions[pivotIndex], false, true, -14, 0);
      this.moveElem($currentIndexHighlighter, barPositions[currentIndex], false, true);
      await this.waitTime(500);

      if (shouldSwap) {
        if (isEnd) {
          this.addClassName($pivotHighlighter, "quick-should-swap");
        } else {
          this.changeArrowColor($currentIndexHighlighter, "#ff9191");
        }
        await this.waitTime(500);
        this.addClassName($nextPivotIndexHighlighter, "quick-should-swap");
        await this.waitTime(500);

        const [indexA, indexB] = (() => {
          if (isEnd) {
            return [step.pivotIndex, step.nextPivotIndex];
          } else {
            return [step.currentIndex, step.nextPivotIndex];
          }
        })();

        if (indexA === indexB) {
          await this.addJumpAnimation(this.$barBoxes[indexA]);
        } else {
          const $barBoxA = this.$barBoxes[indexA];
          const $barBoxB = this.$barBoxes[indexB];
          [this.$barBoxes[indexA], this.$barBoxes[indexB]] = [this.$barBoxes[indexB], this.$barBoxes[indexA]];
          this.swapElem($barBoxA, $barBoxB, indexA, indexB, barPositions, false, true);
          await this.waitTime(500);
        }

        this.changeArrowColor($currentIndexHighlighter, "black");
        this.removeClassName($nextPivotIndexHighlighter, "quick-should-swap");
        this.removeClassName($pivotHighlighter, "quick-should-swap");

        if (sortSteps[i + 1] && !isEnd) {
          const nextNextPivotIndex = sortSteps[i + 1].nextPivotIndex;
          this.moveElem($nextPivotIndexHighlighter, barPositions[nextNextPivotIndex], false, true);
          await this.waitTime(500);
        }
      } else {
        await this.waitTime(500);
      }
    }
  };
}

