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

    if (inputArray.some(element => element.match(/[^0-9]/g))) {
      window.alert("Not valid");
      return false;
    }

    return true;
  }

  disableInputs = () => {
    this.$submitButton.disabled = true;
    this.$startButton.disabled = true;
  }

  enableInputs = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.$submitButton.disabled = false;
        this.$startButton.disabled = false;
      }, 1000);
    });
  }

  render = (command, data) => {
    const commands = {
      generateBlocks: () => {
        this.$content.innerHTML = this.template.show(data);
      },
      clearBlocks: () => {
        this._clearContent();
      }
    }

    return commands[command](data);
  }

  swapBlocks = (i, j) => {
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

  pickBlocks = (i, j) => {

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

  releaseBlocks = (i, j) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        this.removeColor(i);
        this.removeColor(j);
      }, 1000);
    });
  }

  releaseBlocksAfterSwap = (i, j) => {
    new Promise((res, rej) => {
      setTimeout(() => {
        this.removeColor(i);
        res();
      }, 1000);
    }).then(res => {
      this.removeColor(j);
    });
  }

  decideSorted = (i) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const $block = document.querySelectorAll('.number-block')[i];
        $block.classList.add("sorted");
        resolve();
      }, 1000);
    });

  }

  pickPivot = (i, blockState = "pivot") => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const $block = document.querySelectorAll('.number-block')[i];
        const $blocks = document.querySelectorAll('.number-block');
        console.log($blocks);
        $block.classList.add(blockState);
        resolve();
      }, 1000);
    });
  }

  removeColor = (i) => {
    const $block = document.querySelectorAll('.number-block')[i];
    $block.classList.remove("picked");
  }

  _clearContent = () => {
    while (this.$content.lastElementChild) {
      this.$content.removeChild(this.$content.lastElementChild);
    }
  }
}
