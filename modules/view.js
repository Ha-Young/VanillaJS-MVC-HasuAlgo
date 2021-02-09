export default class View {
  "use strict";

  constructor() {
    this.$form = document.querySelector("form");
    this.$numbers = document.querySelector(".numbers");
    this.$sortSelection = document.querySelector(".sort-selection");
    this.$content = document.querySelector(".content");
    this.$submitButton = document.querySelector(".submit");
    this.$startButton = document.querySelector(".start");
    this.$blocksContainer;
    this.$blocks;
    this.$numberPointer;
    this.gapUnit;
    this.SPACE = 30;

    this.render = {
      generateBlocks: (data) => {
        this.$blocks = [];
        const $blocksContainer = document.createElement("div");

        data.forEach((datum) => {
          const $block = document.createElement("div");
          const $blockNumber = document.createElement("span");
          $blocksContainer.classList.add("blocks-container");
          $block.classList.add(datum.defaultClass, datum.colorState);
          $block.style.cssText = `height: ${datum.height}px;`;
          $block.setAttribute("data-distance", 0);
          $blockNumber.classList.add(datum.numberSpan);
          $blockNumber.textContent = datum.blockNumber;
          $block.appendChild($blockNumber);
          $blocksContainer.appendChild($block);
          this.$blocks.push($block);
        });

        this.$content.appendChild($blocksContainer);
        this.$blocksContainer = $blocksContainer;
        const style = getComputedStyle(this.$blocks[0]);
        const blockWidth = parseInt(style.width.replace("px", ""), 10);
        const blockMargin = parseInt(style.margin.replace("px", ""), 10);
        this.gapUnit = blockMargin * 2 + blockWidth;
      },
      clearBlocks: () => {
        this._clearContent();
      }
    }
  }

  bind = (event, handler) => {
    switch (event) {
      case "formSubmit":
        this.$form.addEventListener("submit", (event) => {
          event.preventDefault();
          const input = this.$numbers.value;
          this.$numbers.value = "";
          const selection = this.$sortSelection.options[this.$sortSelection.selectedIndex].text;

          if (!this.isValid(input)) return;

          handler(selection, input);
        });
        break;
      case "startSort":
        this.$startButton.addEventListener("click", event => handler());
        break;
      default:
        console.log("------");
    }
  }

  checkBlocksSorted = () => {
    const $blockList = [...document.querySelectorAll(".number-block")];
    return $blockList.every($block => $block.classList.contains("sorted"));
  }

  isValid = (input) => {
    const inputArray = input.split(",");

    if (inputArray.length < 5 || inputArray.length > 10) {
      alert("Please type 5 to 10 numbers.");
      return false;
    }

    for (const element of inputArray) {
      if (!element.match(/^\d+$/g)) {
        alert("Please type ONLY natural numbers separated by comma.\n(No spacing between comma and number please)");
        return false;
      } else {
        if (parseInt(element, 10) > 500 || parseInt(element, 10) <= 0) {
          alert("Available Range: 0 < Integer <= 500");
          return false;
        }
      }
    }

    return true;
  }

  disableInputs = () => {
    this.$submitButton.disabled = true;
    this.$startButton.disabled = true;
  }

  enableInputs = () => {
    this.$submitButton.disabled = false;
    this.$startButton.disabled = false;
  }

  swapBlocks = (i, j) => {
    if (i === j) return;

    const $blockI = this.$blocks[i];
    const $blockJ = this.$blocks[j];
    const gap = Math.abs(i - j) * this.gapUnit;
    this._moveBlocks($blockI, gap, false);
    this._moveBlocks($blockJ, gap, true);
    this.$blocks[i] = $blockJ;
    this.$blocks[j] = $blockI;
  }

  partitionBlocks = (p) => {
    this.$blocks.forEach(($block, i) => {
      if (p > i) {
        this._moveBlocks($block, this.SPACE, true);
      }

      if (p < i) {
        this._moveBlocks($block, this.SPACE, false);
      }
    });
  }

  gatherBlocks = (p) => {
    this.$blocks.forEach(($block, i) => {
      if (p > i) {
        this._moveBlocks($block, this.SPACE, false);
      }

      if (p < i) {
        this._moveBlocks($block, this.SPACE, true);
      }
    });
  }

  changeBlocksColor = (i, j, state) => {
    if (j !== null) this._addColor(j, state);

    this._addColor(i, state);
  }

  revertBlocksColor = (i, j, state) => {
    if (j !== null) this._removeColor(j, state);

    this._removeColor(i, state);
  }

  decideSorted = (i) => {
    this._addColor(i, "sorted");
    this._removePivotPointer(i);
  }

  _generatePointer = (value) => {
    if (this.$numberPointer) {
      return this.$numberPointer;
    }

    const $numberPointer = document.createElement("div");
    const $pointerSpan = document.createElement("span");
    $numberPointer.classList.add("number-pointer");
    $pointerSpan.classList.add("pointer-span");
    $pointerSpan.textContent = value;
    $numberPointer.appendChild($pointerSpan);
    this.$numberPointer = $numberPointer;
    return $numberPointer;
  }

  pointPivot = (i) => {
    const $pivotPointer = this._generatePointer("pivot");
    this.$blocks[i].appendChild($pivotPointer);
  }

  _removePivotPointer = (i) => {
    const $pivotPointer = this.$blocks[i].querySelector(".number-pointer");
    if ($pivotPointer) this.$blocks[i].removeChild($pivotPointer);
  }

  _moveBlocks = ($block, movingDistance, isLeft) => {
    const distance = parseInt($block.getAttribute("data-distance"), 10);

    if (isLeft) {
      $block.style.transform = `translateX(${distance - movingDistance}px)`;
      $block.setAttribute("data-distance", distance - movingDistance);
    } else {
      $block.style.transform = `translateX(${distance + movingDistance}px)`;
      $block.setAttribute("data-distance", distance + movingDistance);
    }
  }

  _addColor = (i, state) => {
    this.$blocks[i].classList.add(state);
  }

  _removeColor = (i, state) => {
    this.$blocks[i].classList.remove(state);
  }

  _clearContent = () => {
    while (this.$content.lastElementChild) {
      this.$content.removeChild(this.$content.lastElementChild);
    }
  }
}
