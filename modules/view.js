export default class View {
  "use strict";

  constructor(template) {
    this.template = template;
    this.$form = document.querySelector("form");
    this.$numbers = document.querySelector(".numbers");
    this.$sortSelection = document.querySelector(".sort-selection");
    this.$content = document.querySelector(".content");
    this.$submitButton = document.querySelector(".submit");
    this.$startButton = document.querySelector(".start");
    this.$blocksContainer;
    this.$blocks;
    this.blockWidth;
    this.blockMargin;
    this.DELAY = 200;
    this.SPACE = 50;

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
        this.blockWidth = parseInt(style.width.replace("px", ""), 10);
        this.blockMargin = parseInt(style.margin.replace("px", ""), 10);
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

  swapBlocks = async (i, j) => {
    if (i === j) return this._wait(this.DELAY);

    const $blockI = this.$blocks[i];
    const $blockJ = this.$blocks[j];
    const gap = Math.abs(i - j) * (this.blockMargin * 2 + this.blockWidth);
    this._moveBlocks($blockI, gap, false);
    this._moveBlocks($blockJ, gap, true);
    this.$blocks[i] = $blockJ;
    this.$blocks[j] = $blockI;

    await this._wait(this.DELAY);
  }

  partitionBlocks = async (p) => {
    this.$blocks.forEach(($block, i) => {
      if (p > i) {
        this._moveBlocks($block, this.SPACE, true);
      }

      if (p < i) {
        this._moveBlocks($block, this.SPACE, false);
      }
    });

    await this._wait(400);
  }

  gatherBlocks = async (p) => {
    this.$blocks.forEach(($block, i) => {
      if (p > i) {
        this._moveBlocks($block, this.SPACE, false);
      }

      if (p < i) {
        this._moveBlocks($block, this.SPACE, true);
      }
    });

    await this._wait(400);
  }

  changePickedBlocksColor = async (i, j) => {
    if (j !== null) this._addColor(j);

    this._addColor(i);
    await this._wait(this.DELAY);
  }

  revertBlocksColor = async (i, j) => {
    if (j !== null) this._removeColor(j);

    this._removeColor(i);
    await this._wait(this.DELAY);
  }

  decideSorted = async (i) => {
    this._addColor(i, "sorted");
    await this._wait(this.DELAY);
  }

  changePivotBlockColor = async (i, blockState = "pivot") => {
    this.$blocks[i].classList.add(blockState);
    await this._wait(this.DELAY);
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

  _addColor = (i, color = "picked") => {
    this.$blocks[i].classList.add(color);
  }

  _removeColor = (i, color = "picked") => {
    this.$blocks[i].classList.remove(color);
  }

  _clearContent = () => {
    while (this.$content.lastElementChild) {
      this.$content.removeChild(this.$content.lastElementChild);
    }
  }

  _wait(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    })
  }
}
