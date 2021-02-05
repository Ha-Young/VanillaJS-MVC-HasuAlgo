const BubbleView = function () {
  this.moveFactor = {};

  this.$inputForm = qs(".input-form");
  this.$inputBox = qs(".input-box");
  this.$randomButton = qs(".random-button");
  this.$shuffleButton = qs(".shuffle-button");
  this.$startButton = qs(".start-button");
  this.$resetButton = qs(".reset-button");
  this.$alertMessage = qs(".alert-message");
  this.$sortContainer = qs(".sort-list");
};

BubbleView.prototype.renderInput = function (type, parameter) {
  const self = this;
  const renderType = {
    "DRAW LIST": function () {
      self.$resetButton.classList.remove("hide");

      self.paintBar(parameter);
    },
    RESET: function () {
      self.$sortContainer.innerHTML = "";
      self.$startButton.classList.remove("hide");
      self.$shuffleButton.classList.remove("hide");
      self.$randomButton.classList.remove("hide");
      self.$resetButton.classList.add("hide");

      self.moveHistory = {};
    },
  };

  renderType[type]();
};

BubbleView.prototype.renderVisualize = async function ({
  type,
  sourceIndex,
  targetIndex,
}) {
  const self = this;
  const source = gbi(`#${sourceIndex}`);
  const target = gbi(`#${targetIndex}`);

  self.$sortElementList = qsa(".sort-element");
  const visualize = {
    "START BUBBLE": async function () {
      self.$inputForm.classList.add("hide");
      self.$shuffleButton.classList.add("hide");
      self.$randomButton.classList.add("hide");
      self.$startButton.classList.add("hide");
      self.$resetButton.classList.add("hide");
    },
    "PAINT COMPARE": async function () {
      source.children[0].classList.add("comparing");
      target.children[0].classList.add("comparing");
      await wait(400);
    },
    SWAP: async function () {
      const sourceCoordiX = source.getBoundingClientRect().x;
      const targetCoordiX = target.getBoundingClientRect().x;
      const distance = targetCoordiX - sourceCoordiX;
      const sourceFactor = ++self.moveFactor[source.id];
      const targetFactor = --self.moveFactor[target.id];

      source.style.transform = `translateX(${distance * sourceFactor}px)`;
      target.style.transform = `translateX(${distance * targetFactor}px)`;

      await wait(600);

      target.removeAttribute("id");
      source.removeAttribute("id");
      target.setAttribute("id", `#${sourceIndex}`);
      source.setAttribute("id", `#${targetIndex}`);

      self.moveFactor[source.id] = sourceFactor;
      self.moveFactor[target.id] = targetFactor;

      await wait(0);
    },
    "UNPAINT COMPARE": async function () {
      source.children[0].classList.remove("comparing");
      target.children[0].classList.remove("comparing");
      await wait(400);
    },
    "PAINT SORTED": async function () {
      source.children[0].classList.add("done");
      await wait(400);
    },
    "FINISH BUBBLE": function () {
      self.$inputForm.classList.remove("hide");
      self.$resetButton.classList.remove("hide");
    },
  };

  await visualize[type]();
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

  for (let i = 0; i < list.length; i++) {
    const li = document.createElement("li");

    li.setAttribute("class", "sort-element");
    li.setAttribute("id", `#${i}`);
    li.innerHTML = `
			<div class="sort-bar"></div>
			<span class="sort-number">${list[i]}</span>
      `;
    li.children[0].style.height = `${(list[i] / maxNumber) * 320}px`;

    this.$sortContainer.appendChild(li);
    this.moveFactor[`#${i}`] = 0;
  }
};

export default BubbleView;
