export default class View {
  constructor() {
    this.$inputNumber = document.querySelector(".user-interface > .input-numbers");
    this.$selectSort = document.querySelector(".user-interface > .select-sort");
    this.$buttonRun = document.querySelector(".user-interface > .button-run")
    this.$mainAnimation = document.querySelector(".animation-container");
    this._caches = {};
  }

  addEvent(elem, type, callback) {
      elem.addEventListener(type, callback);
  }

  clearInput() {
    this.$inputNumber.value = "";
  }

  makeElements(sortType, datum) {
    const elements = [];
    switch (sortType) {
      case "bubble": case "insertion":
        const sortedDatum = datum.slice().sort((a, b) => a.value - b.value);
        const MAIN_HEIGHT = 270;
        let stickHeight = Math.floor(MAIN_HEIGHT / datum.length);
        const height = stickHeight;

        for (let i = 0; i < sortedDatum.length; i++) {
          const data = sortedDatum[i];
          const stick = document.createElement("div");
          stick.style.height = stickHeight + "px";
          stick.innerText = data.value;
          stick.className = "stick";
          stick.setAttribute("data-move-distance", 0);
          elements[data.index] = stick;
          if (sortedDatum[i + 1] && data.value !== sortedDatum[i + 1].value) stickHeight += height;
        }
        if (sortType === "bubble") {
          this._caches.bubble = elements;
        } else {
          this._caches.insertion = elements;
        }
        break;
    }
    return elements;
  }

  render(type, sortType, sortingData, changedIndex = null) {
    const self = this;

    switch (type) {
      case "init":
        const elements = self.makeElements(sortType, sortingData);
        for (const elem of elements) {
          self.$mainAnimation.appendChild(elem);
          self.$mainAnimation.style.opacity = "1";
        }
        break;
      case "change":
        self._sortVisual(sortType, changedIndex);
        break;
      case "clear":
        const existedSticks = self.$mainAnimation.children;
        const numberOfSticks = existedSticks.length;
        for (let i = 0; i < numberOfSticks ; i++) {
          existedSticks[0].remove();
        }
        break;
    }
  }

  _sortVisual(sortType, changedIndex) {
    switch (sortType) {
      case "bubble":
          const frontStick = this._caches.bubble[changedIndex];
          const rearStick = this._caches.bubble[changedIndex + 1];
          const frontXCoordinate = frontStick.getBoundingClientRect().x;
          const rearXCoordinate = rearStick.getBoundingClientRect().x;
          const moveDistance = Math.abs(rearXCoordinate - frontXCoordinate);
          const frontMoved = +frontStick.getAttribute("data-move-distance");
          const rearMoved = +rearStick.getAttribute("data-move-distance");
          frontStick.setAttribute("data-move-distance", frontMoved + moveDistance);
          rearStick.setAttribute("data-move-distance", rearMoved - moveDistance);
          frontStick.style.transform = `translate(${frontMoved + moveDistance}px)`;
          rearStick.style.transform = `translate(${rearMoved - moveDistance}px)`;
          [this._caches.bubble[changedIndex], this._caches.bubble[changedIndex + 1]] = [rearStick, frontStick];
        break;
    }
  }
}