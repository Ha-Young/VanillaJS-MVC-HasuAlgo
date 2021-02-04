const BubbleView = function () {
  this.$sortStyle = qs(".sort-style");
  this.$inputBox = qs(".input-box");
  this.$inputForm = qs(".input-form");
  this.$insertButton = qs(".insert-button");
  this.$randomButton = qs(".random-button");
  this.$shuffleButton = qs(".shuffle-button");
  this.$startButton = qs(".start-button");
  this.$resetButton = qs(".reset-button");
  this.$alertMessage = qs(".alert-message");
  this.$sortContainer = qs(".sort-list");
};

BubbleView.prototype.render = function (viewCommand, parameter, ...args) {
  const self = this;

  const viewCommands = {
    paintNewList: function () {
      self.$resetButton.classList.remove("hide");

      self.paintBar(parameter);
    },
    colorElement: function () {
      self.$shuffleButton.classList.add("hide");
      self.$randomButton.classList.add("hide");
      self.$startButton.classList.add("hide");
      self.$resetButton.classList.add("hide");
      self.$sortElementList = qsa(".sort-element");

      const firstIndex = parameter;
      const secondIndex = firstIndex + 1;
      const firstElement = self.$sortElementList[firstIndex];
      const secondElement = self.$sortElementList[secondIndex];

      firstElement.childNodes[1].classList.add("comparing");
      secondElement.childNodes[1].classList.add("comparing");
    },
    swapElement: function () {
      const firstElement = self.$sortElementList[parameter];
      const secondElement = self.$sortElementList[parameter + 1];
      const firstValue = args[0];
      const secondValue = args[1];
      const firstHeight = firstElement.childNodes[1].style.height;
      const secondHeight = secondElement.childNodes[1].style.height;

      firstElement.childNodes[3].innerHTML = firstValue;
      firstElement.childNodes[1].style.height = secondHeight;

      secondElement.childNodes[3].innerHTML = secondValue;
      secondElement.childNodes[1].style.height = firstHeight;
    },
    uncolorElement: function () {
      const firstElement = self.$sortElementList[parameter];
      const secondElement = self.$sortElementList[parameter + 1];
      const lastIndex = args[0];

      firstElement.childNodes[1].classList.remove("comparing");
      secondElement.childNodes[1].classList.remove("comparing");

      if (parameter === lastIndex - 1) {
        secondElement.childNodes[1].classList.add("done");
      }
    },
    finishSort: function () {
      self.$sortElementList[0].childNodes[1].classList.add("done");
      self.$resetButton.classList.remove("hide");
    },
    paintReset: function () {
      self.$sortContainer.innerHTML = "";
      self.$startButton.classList.remove("hide");
      self.$shuffleButton.classList.remove("hide");
      self.$randomButton.classList.remove("hide");
      self.$resetButton.classList.add("hide");
    },
  };

  viewCommands[viewCommand]();
};

BubbleView.prototype.connectHandler = function (event, handler) {
  const self = this;

  switch (event) {
    case "addNumber":
      $on(self.$inputForm, "submit", function (event) {
        event.preventDefault();
        handler(self.$inputBox.value);
        self.$inputBox.value = "";
      });
      break;

    case "startSort":
      $on(self.$startButton, "click", function () {
        if (!self.$sortContainer.childElementCount) {
          return;
        }
        handler();
      });
      break;

    case "shuffleNum":
      $on(self.$shuffleButton, "click", function () {
        if (!self.$sortContainer.childElementCount) {
          return;
        }
        handler();
      });
      break;

    case "resetList":
      $on(self.$resetButton, "click", function () {
        handler();
      });
      break;

    case "setRandom":
      $on(self.$randomButton, "click", function () {
        if (self.$sortContainer.childElementCount < 10) {
          handler();
        }
      });
      break;

    default:
      break;
  }
};

BubbleView.prototype.paintBar = function (list) {
  this.$sortContainer.innerHTML = "";
  const maxNumber = Math.max.apply(null, list);

  for (const number of list) {
    const li = document.createElement("li");
    li.classList.add("sort-element");
    li.innerHTML = `
			<div class="sort-bar" style="height:${(number / maxNumber) * 320}px"></div>
			<span class="sort-number">${number}</span>
			`;
    this.$sortContainer.appendChild(li);
  }
};

export default BubbleView;
