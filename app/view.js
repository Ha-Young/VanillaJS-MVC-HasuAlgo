import { Template } from "./template";

export const View = function () {
  this.template = new Template();

  this.ENTER_KEY = 13;
  this.ESCAPE_KEY = 27;

  this.$inputBox = qs(".input-box");
  this.$inputForm = qs(".input-form");
  this.$insertButton = qs(".insert-button");
  this.$randomButton = qs(".random-button");
  this.$shuffleButton = qs(".shuffle-button");
  this.$startButton = qs(".start-button");
  this.$resetButton = qs(".reset-button");
  this.$alertMessage = qs(".alert-message");
  this.$sortContainer = qs(".sort-list");
  this.$sortElementList = qsa(".sort-element");
};

View.prototype.render = function (viewCommand, parameter, ...args) {
  const self = this;
  const viewCommands = {
    paintNewNumber: function () {
      for (const number of parameter) {
        const elementCount = self.$sortContainer.childElementCount;
        if (elementCount > 9) {
          return;
        }
        const li = document.createElement("li");
        li.classList.add("sort-element");
        li.innerHTML = `
				<div class="sort-bar" style="height: ${number * 15 + 20}px"></div>
				<span class="sort-number">${number}</span>
				`;
        self.$sortContainer.appendChild(li);
      }
    },
    colorElement: function () {
      self.$sortElementList = qsa(".sort-element");
      const firstIndex = parameter;
      const secondIndex = firstIndex + 1;
      const firstElement = self.$sortElementList[firstIndex];
      const secondElement = self.$sortElementList[secondIndex];
      if (firstElement) {
        firstElement.childNodes[1].classList.add("compare");
      }
      if (secondElement) {
        secondElement.childNodes[1].classList.add("compare");
      }
    },
    swapElement: function () {
      const firstIndex = parameter;
      const secondIndex = firstIndex + 1;
      const firstValue = args[0];
      const secondValue = args[1];
      const firstElement = self.$sortElementList[firstIndex];
      const secondElement = self.$sortElementList[secondIndex];

      if (firstElement) {
        firstElement.childNodes[3].innerHTML = firstValue;
        firstElement.childNodes[1].style.height = `${firstValue * 15 + 20}px`;
      }
      if (secondElement) {
        secondElement.childNodes[3].innerHTML = secondValue;
        secondElement.childNodes[1].style.height = `${secondValue * 15 + 20}px`;
      }
    },
    uncolorElement: function () {
      const firstIndex = parameter;
      const secondIndex = firstIndex + 1;
      const firstElement = self.$sortElementList[firstIndex];
      const secondElement = self.$sortElementList[secondIndex];
      if (firstElement) {
        firstElement.childNodes[1].classList.remove("compare");
      }
      if (secondElement) {
        secondElement.childNodes[1].classList.remove("compare");
      }
    },
    finishSort: function () {
      self.$startButton.classList.add("hide");
      self.$resetButton.classList.remove("hide");
    },
    paintReset: function () {
      self.$sortContainer.innerHTML = "";
      self.$startButton.classList.remove("hide");
      self.$resetButton.classList.add("hide");
    },
    removeNumber: function () {},
    clearResetButton: function () {},
    contentBlockVisibility: function () {},
    bubbleSortPage: function () {},
    insertionSortPage: function () {},
    mergeSortPage: function () {
      // self.$todoList.innerHTML = self.template.show(parameter);
    },
  };

  viewCommands[viewCommand]();
};

View.prototype.connectHandler = function (event, handler) {
  const self = this;

  if (event === "addNumber") {
    $on(self.$inputForm, "submit", function (event) {
      event.preventDefault();
      handler(self.$inputBox.value);
      self.$inputBox.value = "";
    });
  } else if (event === "startSort") {
    $on(self.$startButton, "click", function () {
      handler();
    });
  } else if (event === "shuffleNum") {
    $on(self.$shuffleButton, "click", function () {});
  } else if (event === "resetList") {
    $on(self.$resetButton, "click", function () {
      handler();
    });
  }
};

View.prototype.getHeight = function (value) {};
