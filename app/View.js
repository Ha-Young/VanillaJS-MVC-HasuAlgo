function View() {
  this.viewBox = document.querySelector(".sorting-algorithms");

  this.$sortForm = document.querySelector(".sorting__form");
  this.$sortInput = document.querySelector(".sorting__input");
  this.$sortQueue = document.querySelector(".sorting__queue");

  this.$sortDisplay = document.querySelector(".display-container");
  this.$sortItemList = document.querySelector(".sorting__item-list");
  this.$allItem = this.$sortItemList.childNodes;

  this.$sortOptionSelector = document.querySelector(".sorting__select-sort");
  this.sortOptions = {
    bubble: document.querySelector("#Bubble").textContent,
    merge: document.querySelector("#Merge").textContent,
  };

  this.classList = {
    moving: "moving",
    sortItem: "sorting__item",
  };

  this.classList[`${document.querySelector("#Bubble").textContent}`] = "bubble";
  this.classList[`${document.querySelector("#Merge").textContent}`] = "merge";

  this.$paintButton = document.querySelector(".paint-button");
  this.$sortButton = document.querySelector(".sort-button");
  this.$resetButton = document.querySelector(".reset-button");

  this.transitionDelayTime = 410;
  this.raise
}

View.prototype.changeTemplate = function (target, template) {
  target.innerHTML = template;
}

View.prototype.insertChildElement = function (parent, child) {
  parent.appendChild(child);
};

View.prototype.makeSelectorDisable = function () {
  this.$sortOptionSelector.disabled = true;
};

View.prototype.addClass = function (className, item) {
  item.classList.add(className);
};

View.prototype.removeClass = function (className, item) {
  item.classList.remove(className);
};

View.prototype.clearInputContent = function () {
  this.$sortInput.value = "";
};

View.prototype.setItemsHeight = function (targetNumber, height) {
  targetNumber.style.height = `${height}px`;
};

View.prototype.printNumbers = function (sortList) {
  this.$sortQueue.textContent = sortList.join(", ");
  this.clearInputContent();
};

View.prototype.resetTranslate = function (item) {
  item.style.transform = null;
};

View.prototype.swapDomPosition = function (left, right) {
  this.$sortItemList.insertBefore(right, left);
};

View.prototype.getCoordinate = function (item, key) {
  return item.getBoundingClientRect()[key];
};

View.prototype.translateX = function (target, translateValue) {
  target.style.transform = `translateX(${translateValue}px)`;
};

View.prototype.translateY = function (target, translateValue) {
  target.style.transform = `translateY(${translateValue}px)`;
};

View.prototype.setDelayForTransition = function () {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, view.transitionDelayTime);
  });
};

View.prototype.createSortItems = function (inputNumber) {
  const $item = document.createElement("li");

  $item.textContent = inputNumber;
  this.addClass(this.classList.sortItem, $item);

  if (this.$sortOptionSelector.value === this.sortOptions.bubble) {
    this.setItemsHeight($item, inputNumber);
  }

  return $item;
};

View.prototype.paintSortItems = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    const item = this.createSortItems(sortList[i]);

    this.addClass(this.classList[this.$sortOptionSelector.value], item);
    this.insertChildElement(this.$sortItemList, item);
  }
};

View.prototype.chageSortItemPosition = async function (left, right) {
  const itemList = [left, right];

  const leftCoordinateX = this.getCoordinate(left, "x");
  const rightCoordinateX = this.getCoordinate(right, "x");

  itemList.forEach(function (item) {
    view.addClass(view.classList.moving, item);
  });

  this.translateX(left, rightCoordinateX - leftCoordinateX);
  this.translateX(right, leftCoordinateX - rightCoordinateX);

  await this.setDelayForTransition();
};

export const view = new View();
