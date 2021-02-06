import { Template } from "./template";

class View {
  constructor() {
    this.template = new Template();
    this.moveFactor = {};

    this.$inputForm = qs(".input-form");
    this.$inputBox = qs(".input-box");
    this.$sortSpace = qs(".sort-space");
    this.$randomButton = qs(".random-button");
    this.$shuffleButton = qs(".shuffle-button");
    this.$startButton = qs(".start-button");
    this.$resetButton = qs(".reset-button");
    this.$alertMessage = qs(".alert-message");
    this.$sortContainer = qs(".sort-list");
  }

  setSortStyle(sortStyle) {
    switch (sortStyle) {
      case "bubble":
        this.$sortSpace.innerHTML = this.template.bubble;
        break;

      case "insertion":
        this.$sortSpace.innerHTML = this.template.insertion;
        break;

      case "merge":
        this.$sortSpace.innerHTML = this.template.merge;
        break;

      case "quick":
        this.$sortSpace.innerHTML = this.template.quick;
        break;

      default:
        break;
    }
  }

  paintInput(type, parameter) {
    const self = this;
    const paintType = {
      "DRAW LIST": function () {
        self.$resetButton.classList.remove("hide");

        self.paintBar(parameter);
      },
      "RESET LIST": function () {
        self.$sortContainer.innerHTML = "";
        self.$startButton.classList.remove("hide");
        self.$shuffleButton.classList.remove("hide");
        self.$randomButton.classList.remove("hide");
        self.$resetButton.classList.add("hide");

        self.moveHistory = {};
      },
    };

    paintType[type]();
  }

  async renderVisualize({ type, sourceIndex, targetIndex }, sortType) {
    const self = this;
    const source = gbi(`#${sourceIndex}`);
    const target = gbi(`#${targetIndex}`);

    self.$sortElementList = qsa(".sort-element");
    const visualizeBubble = {
      "START SORT": async function () {
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
      "SWAP BUBBLE": async function () {
        const sourceCoordiX = source.getBoundingClientRect().x;
        const targetCoordiX = target.getBoundingClientRect().x;
        const distance = targetCoordiX - sourceCoordiX;
        const sourceMoveFactor = ++self.moveFactor[source.id];
        const targetMoveFactor = --self.moveFactor[target.id];

        source.style.transform = `translateX(${distance * sourceMoveFactor}px)`;
        target.style.transform = `translateX(${distance * targetMoveFactor}px)`;

        await wait(600);

        target.removeAttribute("id");
        source.removeAttribute("id");
        target.setAttribute("id", `#${sourceIndex}`);
        source.setAttribute("id", `#${targetIndex}`);

        self.moveFactor[source.id] = sourceMoveFactor;
        self.moveFactor[target.id] = targetMoveFactor;

        await wait(0);
      },
      "UNPAINT COMPARE": async function () {
        source.children[0].classList.remove("done");
        target.children[0].classList.remove("comparing");
        await wait(400);
      },
      "PAINT SORTED": async function () {
        source.children[0].classList.add("done");
        await wait(400);
      },
      "FINISH SORT": function () {
        self.$inputForm.classList.remove("hide");
        self.$resetButton.classList.remove("hide");
      },
    };

    const visualizeInsertion = {
      "START SORT": async function () {
        self.$inputForm.classList.add("hide");
        self.$shuffleButton.classList.add("hide");
        self.$randomButton.classList.add("hide");
        self.$startButton.classList.add("hide");
        self.$resetButton.classList.add("hide");
      },
      "PAINT SOURCE": async function () {
        source.children[0].classList.add("comparing");
        await wait(500);
      },
      "PAINT TARGET": async function () {
        source.children[0].classList.add("done");
        await wait(500);
      },
      "SWAP INSERTION": async function () {
        const sourceCoordiX = source.getBoundingClientRect().x;
        const targetCoordiX = target.getBoundingClientRect().x;
        const betweenCount = sourceIndex - targetIndex;
        const distance = (sourceCoordiX - targetCoordiX) / betweenCount;
        const betweenList = [];
        for (let i = targetIndex + 1; i < sourceIndex; i++) {
          betweenList.push(gbi(`#${i}`));
        }

        self.moveFactor[source.id] -= betweenCount;
        self.moveFactor[target.id] += 1;
        const sourceMoveFactor = self.moveFactor[source.id];
        const targetMoveFactor = self.moveFactor[target.id];
        const betweenMoveFactor = [];
        for (let i = 0; i < betweenList.length; i++) {
          self.moveFactor[betweenList[i].id] += 1;
          betweenMoveFactor[i] = self.moveFactor[betweenList[i].id];
        }

        source.style.transform = `translateX(${
          distance * self.moveFactor[source.id]
        }px)`;
        target.style.transform = `translateX(${
          distance * self.moveFactor[target.id]
        }px)`;
        for (let i = 0; i < betweenList.length; i++) {
          betweenList[i].style.transform = `translateX(${
            distance * betweenMoveFactor[i]
          }px)`;
        }

        await wait(600);

        source.removeAttribute("id");
        target.removeAttribute("id");
        source.setAttribute("id", `#${targetIndex}`);
        target.setAttribute("id", `#${++targetIndex}`);
        for (let i = 0; i < betweenList.length; i++) {
          betweenList[i].removeAttribute("id");
          betweenList[i].setAttribute("id", `#${++targetIndex}`);
        }

        self.moveFactor[source.id] = sourceMoveFactor;
        self.moveFactor[target.id] = targetMoveFactor;
        for (let i = 0; i < betweenList.length; i++) {
          self.moveFactor[betweenList[i].id] = betweenMoveFactor[i];
        }

        await wait(0);
      },
      "UNPAINT TARGET": async function () {
        source.children[0].classList.remove("comparing");
        source.children[0].classList.remove("done");
        await wait(400);
      },
      "UNPAINT SOURCE": async function () {
        source.children[0].classList.remove("comparing");
        source.children[0].classList.remove("done");
        await wait(400);
      },
      "PAINT ALL": async function () {
        for (let i = 0; i < self.$sortElementList.length; i++) {
          self.$sortElementList[i].children[0].classList.add("done");
        }
        await wait(200);
      },
      "FINISH SORT": function () {
        self.$inputForm.classList.remove("hide");
        self.$resetButton.classList.remove("hide");
      },
    };

    switch (sortType) {
      case "bubble":
        await visualizeBubble[type]();
        break;

      case "insertion":
        await visualizeInsertion[type]();
        break;

      case "merge":
        await visualizeMerge[type]();
        break;

      case "quick":
        await visualizeQuick[type]();
        break;

      default:
        break;
    }
  }

  connectHandler(event, handler) {
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

      case "shuffleNumber":
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
  }

  paintBar(list) {
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
      li.children[0].style.height = `${(list[i] / maxNumber) * 380}px`;

      this.$sortContainer.appendChild(li);
      this.moveFactor[`#${i}`] = 0;
    }
  }
}

export default View;
