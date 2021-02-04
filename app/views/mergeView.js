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
  this.$firstContainer = qs(".merge-first");
  this.$secondContainer = qs(".merge-second");
  this.$thirdContainer = qs(".merge-third");
  this.$forthContainer = qs(".merge-forth");
  this.$mergeContainer = qs(".merge-container");
};

MergeView.prototype.render = function (viewCommand, parameter, ...args) {
  const self = this;

  const viewCommands = {
    paintNewNumber: function () {
      self.$resetButton.classList.remove("hide");

      self.fillNumber(parameter, args[0]);
    },
    paintReset: function () {
      for (let i = 0; i < self.$firstContainer.children.length; i++) {
        self.$firstContainer.children[i].children[0].innerHTML = "";
        self.$firstContainer.children[i].classList.remove("merge-active");
      }
      self.$startButton.classList.remove("hide");
      self.$shuffleButton.classList.remove("hide");
      self.$randomButton.classList.remove("hide");
      self.$resetButton.classList.add("hide");
    },
    divide: function () {
      const turn = parameter;
      if (turn === 1) {
        for (let i = 0; i < self.$firstContainer.children.length; i++) {
          self.$secondContainer.children[i].children[0].innerHTML =
            self.$firstContainer.children[i].children[0].innerHTML;
          self.$firstContainer.children[i].children[0].innerHTML = "";
          self.$firstContainer.children[i].classList.remove("merge-active");
          self.$firstContainer.children[i].classList.remove("merge-wait");
          self.$secondContainer.children[i].classList.add("merge-active");
        }
      } else if (turn === 2) {
        for (let i = 0; i < self.$firstContainer.children.length; i++) {
          self.$thirdContainer.children[i].children[0].innerHTML =
            self.$secondContainer.children[i].children[0].innerHTML;
          self.$secondContainer.children[i].children[0].innerHTML = "";
          self.$secondContainer.children[i].classList.remove("merge-active");
          self.$thirdContainer.children[i].classList.add("merge-active");
        }
      } else if (turn === 3) {
        for (let i = 0; i < self.$firstContainer.children.length; i++) {
          self.$forthContainer.children[i].children[0].innerHTML =
            self.$thirdContainer.children[i].children[0].innerHTML;
          self.$thirdContainer.children[i].children[0].innerHTML = "";
          self.$thirdContainer.children[i].classList.remove("merge-active");
          self.$forthContainer.children[i].classList.add("merge-active");
        }
      }
    },
    getMerge: function () {
      console.log(parameter);
      console.log(mergeOrder);
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
        if (!self.$firstContainer.children[7].childNodes.length) {
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
        if (!self.$firstContainer.children[7].value) {
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
  const position = this.$firstContainer.children[index].children[0];
  position.innerHTML = number;

  if (index === this.$firstContainer.children.length - 1) {
    for (const element of this.$firstContainer.children) {
      element.classList.add("merge-active");
    }
  }
};

const paintMerge = function (number, turn) {
  if (turn === 2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`호출: ${turn}`);
        console.log(number);
        resolve();
      }, 1000);
    });
  } else if (turn === 4) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`호출: ${turn}`);
        console.log(number);
        resolve();
      }, 1000);
    });
  } else if (turn === 8) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // console.log(`호출: ${turn}`);
        // console.log(number);
        resolve();
      }, 1000);
    });
  }
};

export default MergeView;
