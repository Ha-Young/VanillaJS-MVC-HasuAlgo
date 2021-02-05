export default class View {
  constructor() {
    this.$inputNumber = document.querySelector(".user-interface > .input-numbers");
    this.$selectSort = document.querySelector(".user-interface > .select-sort");
    this.$buttonRun = document.querySelector(".user-interface > .button-run")
    this.$mainAnimationContainer = document.querySelector(".animation-container");
    this._caches = {};
  }

  addEvent(elemName, type, callback) {
    this[elemName].addEventListener(type, callback);
  }

  makeElement(tagName, className = "", id = "") {
    this["$" + className] = document.createElement(tagName);
    this["$" + className].className = className;
    this["$" + className].id = id;
    return this["$" + className];
  }

  appendChild(parentName, childElement) {
    this[parentName].appendChild(childElement);
  }

  manufactureStick(sortType, stickElement, index, collection) {
    const ARTICLE_HEIGHT = 180;
    const stickHeight = Math.floor(ARTICLE_HEIGHT / collection.length);
    if (sortType === "bubble" || sortType === "insertion") {
      stickElement.style.height = stickHeight * (index + 1) + "px";
      stickElement.innerText = collection[index].value;
      stickElement.setAttribute("data-index", collection[index].index);
      return stickElement;
    }
  }

  setCaches(sortType, sticks) {
    this._caches[sortType] = sticks;
  }


  render(act, sortType, index) {
    const sticks = this._caches[sortType];

    if (act === "init") {
      this["$article-" + sortType].style.opacity = "1";
    } else if (act === "changed") {
      this._sortVisual(sortType, index);
    } else if (act === "semifinished") {
      sticks[index].style.backgroundColor = "rgb(234, 195, 0)";
    } else if (act === "finished") {
      for (let j = index - 1; 0 <= j; j--) {
        sticks[j].style.backgroundColor = "rgb(234, 195, 0)";
      }
    } else if (act === "clear") {
      const $article = this["$article-" + sortType];
      const $sticks = $article.children;
      while ($sticks.length) $sticks[0].remove();
      $article.remove();
    }
  }

  _sortVisual(sortType, changedIndex) {
    if (sortType === "bubble" || sortType === "insertion") {
      const frontStick = this._caches[sortType][changedIndex];
      const rearStick = this._caches[sortType][changedIndex + 1];
      console.log(frontStick, rearStick)

      const frontXCoordinate = frontStick.getBoundingClientRect().x;
      const rearXCoordinate = rearStick.getBoundingClientRect().x;

      const moveDistance = Math.abs(rearXCoordinate - frontXCoordinate);
      const frontMoved = Number(frontStick.getAttribute("data-move-distance"));
      const rearMoved = Number(rearStick.getAttribute("data-move-distance"));

      frontStick.setAttribute("data-move-distance", frontMoved + moveDistance);
      rearStick.setAttribute("data-move-distance", rearMoved - moveDistance);

      frontStick.style.transform = `translate(${frontMoved + moveDistance}px)`;
      rearStick.style.transform = `translate(${rearMoved - moveDistance}px)`;

      this._caches[sortType][changedIndex] = rearStick;
      this._caches[sortType][changedIndex + 1] = frontStick;
      return;
    }
  }
}
