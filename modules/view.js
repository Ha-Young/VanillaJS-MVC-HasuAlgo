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

    this.render = {
      generateBlocks: (data) => {
        this.$content.innerHTML = this.template.show(data).trim();
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

          if (!this.isValid(input)) {
            return;
          }

          handler(selection, input);
        });
        break;
      case "startSort":
        this.$startButton.addEventListener("click", (event) => {
          handler();
        });
        break;
      default:
        console.log("------");
    }
  }

  checkBlocksSorted = () => {
    const $blocks = [...document.querySelectorAll(".number-block")];
    return $blocks.every($block => $block.classList.contains("sorted"));
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
    if (i === j) return this._wait(200);

    const $blockI = document.querySelectorAll(".number-block")[i];
    const $blockJ = document.querySelectorAll(".number-block")[j];
    const $siblingI = $blockI.nextSibling === $blockJ ? $blockI : $blockI.nextSibling;
    const transformPropertyI = getComputedStyle($blockI).getPropertyValue("transform");
    const transformPropertyJ = getComputedStyle($blockJ).getPropertyValue("transform");

    $blockI.style.transform = transformPropertyJ;
    $blockJ.style.transform = transformPropertyI;

    await this._wait(100);

    this.$content.insertBefore($blockI, $blockJ);
    this.$content.insertBefore($blockJ, $siblingI);

    await this._wait(100);
  }

  changePickedBlocksColor = async (i, j) => {
    if (j !== null) this._addColor(j);

    this._addColor(i);
    await this._wait(200);
  }

  revertBlocksColor = async (i, j) => {
    if (j !== null) this._removeColor(j);

    this._removeColor(i);
    await this._wait(200);
  }

  decideSorted = async (i) => {
    this._addColor(i, "sorted");
    await this._wait(200);
  }

  changePivotBlockColor = async (i, blockState = "pivot") => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.add(blockState);
    await this._wait(200);
  }

  _addColor = (i, color = "picked") => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.add(color);
  }

  _removeColor = (i, color = "picked") => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.remove(color);
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
