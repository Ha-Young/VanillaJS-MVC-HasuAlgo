import { reject } from "q";

export default class View {
  "use strict";

  /**
       * View that abstracts away the browser's DOM completely.
       * It has two simple entry points:
       *
       *   - bind(eventName, handler)
       *     Takes a visual algorithm application event and registers the handler
       *   - render(command, parameterObject)
       *     Renders the given command with the options
       */
  constructor(template) {
    this.template = template;
    this.$form = document.querySelector("form");
    this.$numbers = document.querySelector(".numbers");
    this.$sortSelection = document.querySelector(".sort-selection");
    this.$content = document.querySelector(".content");
  }

  bind(event, handler) {
    const self = this;

    if (event === "formSubmit") {
      self.$form.addEventListener("submit", function (event) {
        event.preventDefault();

        const input = self.$numbers.value;
        const selection = self.$sortSelection.options[self.$sortSelection.selectedIndex].text;

        if (!self.isValid(input)) {
          return;
        }

        handler(selection, input)
      });
    }
  }

  isValid(input) {
    let inputArray = input.split(",");

    if (inputArray.length < 5 || inputArray.length > 10) {
      window.alert("out of range");
      return false;
    }

    if (inputArray.some(element => element.match(/[^0-9]/g))) {
      window.alert("Not valid");
      return false;
    }

    return true;
  }

  render(command, data) {
    const self = this;
    const commands = {
      generateBlocks: function () {
        //const $blocks = createNode(self.template.show(data));
        //self.$content.appendChild($blocks);
        self.$content.innerHTML = self.template.show(data);
      }
    }

    return commands[command](data);
  }

  swapBlocks(i, j) {
    //const self = this;

    return new Promise((resolve, reject) => {
      const $blockI = document.querySelectorAll('.number-block')[i];
      const $blockJ = document.querySelectorAll('.number-block')[j];
      const transformI = getComputedStyle($blockI).getPropertyValue("transform");
      const transformJ = getComputedStyle($blockJ).getPropertyValue("transform");
      $blockI.style.transform = transformJ;
      $blockJ.style.transform = transformI;

      setTimeout(() => {
        this.$content.insertBefore($blockJ, $blockI);
        resolve();
      }, 1000);
    });
  }

  pickBlocks(i, j) {

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        const $blockLeft = document.querySelectorAll('.number-block')[i];
        const $blockRight = document.querySelectorAll('.number-block')[j];
        $blockLeft.classList.add("picked");
        $blockRight.classList.add("picked");
        resolve();
      }, 1000);
    });
  }

  releaseBlocksAsync(i, j) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        this.removeColor(i);
        this.removeColor(j);
      }, 1000);
    });
  }

  releaseBlocks(i, j) {
    this.removeColor(i);
    this.removeColor(j);
  }

  decideSorted(i) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const $block = document.querySelectorAll('.number-block')[i];
        $block.classList.add("sorted");
        resolve();
      }, 1000);
    });

  }

  changeColor(i, blockState = "picked") {
    const $block = document.querySelectorAll('.number-block')[i];
    $block.classList.add(blockState);
  }

  removeColor(i) {
    const $block = document.querySelectorAll('.number-block')[i];
    $block.classList.remove("picked");
  }



  clearContent() {
    while (this.$content.lastElementChild) {
      console.log(this.$content.lastElementChild);
      this.$content.removeChild(this.$content.lastElementChild);
    }
  }
}
