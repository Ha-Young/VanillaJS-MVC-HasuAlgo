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
    sort: "sort",
    sortItem: "sorting__item",
  };

  this.classList[`${document.querySelector("#Bubble").textContent}`] = "bubble";
  this.classList[`${document.querySelector("#Merge").textContent}`] = "merge";

  this.$paintButton = document.querySelector(".paint-button");
  this.$sortButton = document.querySelector(".sort-button");
  this.$resetButton = document.querySelector(".reset-button");

  this.transitionDelayTime = 700;
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

View.prototype.setTextContent = function (target, content) {
  target.textContent = content;
};

View.prototype.setItemsHeight = function (targetNumber, height) {
  targetNumber.style.height = `${height}px`;
};

View.prototype.printNumbers = function (sortList) {
  this.$sortQueue.textContent = sortList.join(", ");
  this.$sortInput.value = "";
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

View.prototype.translate = function (target, x, y = 0) {
  target.style.transform = `translate(${x}px, ${y}px)`;
};

View.prototype.setDelayForTransition = function (delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delay);
  });
};

View.prototype.createSortItems = function (inputNumber) {
  const $item = document.createElement("li");

  this.setTextContent($item, inputNumber);
  $item.classList.add(this.classList.sortItem);

  if (this.$sortOptionSelector.value === this.sortOptions.bubble) {
    this.setItemsHeight($item, inputNumber);
  }

  return $item;
};

View.prototype.paintSortItems = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    const item = this.createSortItems(sortList[i]);

    item.classList.add(this.classList[this.$sortOptionSelector.value]);
    this.insertChildElement(this.$sortItemList, item);
  }
};

View.prototype.chageSortItemPosition = async function (left, right) {
  const self = this;
  const itemList = [left, right];

  const leftCoordinateX = self.getCoordinate(left, "x");
  const rightCoordinateX = self.getCoordinate(right, "x");

  itemList.forEach(function (item) {
    item.classList.add(self.classList.moving);
  });

  self.translate(left, rightCoordinateX - leftCoordinateX);
  self.translate(right, leftCoordinateX - rightCoordinateX);

  await self.setDelayForTransition(self.transitionDelayTime);
};

export default View;
