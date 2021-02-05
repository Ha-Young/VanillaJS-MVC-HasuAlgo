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
    }
  }

  checkBlocksSorted = () => {
    const $blocks = document.querySelectorAll(".number-block");

    for (const $block of $blocks) {
      if (!$block.classList.contains("sorted")) return false;
    }

    return true;
  }

  isValid = (input) => {
    let inputArray = input.split(",");

    if (inputArray.length < 5 || inputArray.length > 10) {
      window.alert("out of range");
      return false;
    }

    if (inputArray.some(element => element.trim().match(/[^0-9]-?$/g))) {
      window.alert("Not valid");
      return false;
    }

    if (inputArray.some(element => parseInt(element.trim(), 10) >= 500
      || parseInt(element.trim(), 10) <= 0)) {
      window.alert("Available Range: 0 < Integer < 500");
      return false;
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

  render = (command, data) => {
    const commands = {
      generateBlocks: () => {
        this.$content.innerHTML = this.template.show(data).trim();
      },
      clearBlocks: () => {
        this._clearContent();
      }
    }

    return commands[command](data);
  }

  swapBlocks = async (i, j) => {
    if (i === j) return this._wait(200);

    const $blockI = document.querySelectorAll(".number-block")[i];
    const $blockJ = document.querySelectorAll(".number-block")[j];
    const $siblingI = $blockI.nextSibling === $blockJ ? $blockI : $blockI.nextSibling;
    const transformI = getComputedStyle($blockI).getPropertyValue("transform");
    const transformJ = getComputedStyle($blockJ).getPropertyValue("transform");

    $blockI.style.transform = transformJ;
    $blockJ.style.transform = transformI;

    await this._wait(100);

    this.$content.insertBefore($blockI, $blockJ);
    this.$content.insertBefore($blockJ, $siblingI);

    await this._wait(100);
  }

  pickBlocks = async (i, j, areEqualBlocks = false) => {
    if (!areEqualBlocks) {
      const $blockRight = document.querySelectorAll(".number-block")[j];
      $blockRight.classList.add("picked");
    }

    const $blockLeft = document.querySelectorAll(".number-block")[i];
    $blockLeft.classList.add("picked");

    await this._wait(200);
  }

  releaseBlocks = async (i, j, areEqualBlocks = false) => {
    if (!areEqualBlocks) this._removeColor(j);

    this._removeColor(i);
    await this._wait(200);
  }

  decideSorted = async (i) => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.add("sorted");
    await this._wait(200);

  }

  pickPivot = async (i, blockState = "pivot") => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.add(blockState);
    await this._wait(200);
  }

  _removeColor = async (i) => {
    const $block = document.querySelectorAll(".number-block")[i];
    $block.classList.remove("picked");
  }

  _clearContent = () => {
    while (this.$content.lastElementChild) {
      this.$content.removeChild(this.$content.lastElementChild);
    }
  }

  _wait(t) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, t);
    })
  }

}
