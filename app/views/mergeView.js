const MergeView = function () {
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

MergeView.prototype.render = function (viewCommand, parameter, ...args) {
  const self = this;

  const viewCommands = {
    paintNewNumber: function () {
      self.$resetButton.classList.remove("hide");

      self.fillNumber(parameter, args[0]);
    },
    paintReset: function () {
      for (let i = 1; i < self.$sortContainer.childNodes.length; i = i + 2) {
        self.$sortContainer.childNodes[i].innerHTML = "";
      }
      self.$startButton.classList.remove("hide");
      self.$shuffleButton.classList.remove("hide");
      self.$randomButton.classList.remove("hide");
      self.$resetButton.classList.add("hide");
    },
  };

  viewCommands[viewCommand]();
};

MergeView.prototype.connectHandler = function (event, handler) {
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

    case "shuffleNum":
      $on(self.$shuffleButton, "click", function () {
        handler();
      });
      break;

    default:
      break;
  }
};

MergeView.prototype.fillNumber = function (number, index) {
  const position = this.$sortContainer.childNodes[index * 2 + 1];
  position.innerHTML = `<div class="sort-merge"></div>
  <span class="sort-number-merge">${number}</span>`;
};

export default MergeView;
