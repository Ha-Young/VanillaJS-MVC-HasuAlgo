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

  this.translateDelayTime = 450;
}

View.prototype.changeTemplate = function (target, template) {
  target.innerHTML = template;
}

View.prototype.insertElement = function (parent, child) {
  parent.appendChild(child);
};

View.prototype.makeSelectorDisable = function () {
  this.$sortOptionSelector.disabled = true;
};

View.prototype.addClass = function (className, ...items) {
  items.forEach(function (item) {
    item.classList.add(className);
  });
};

View.prototype.removeClass = function (className, ...items) {
  items.forEach(function (item) {
    item.classList.remove(className);
  });
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
    this.insertElement(this.$sortItemList, item);
  }
};

View.prototype.splitArr = function (item) {
  const left = this.$allItem.slice(2);
}

View.prototype.upLocation = function (...items) {
  items.forEach(function (item) {
    view.addClass(view.classList.moving, item);
    item.style.transform = `translateY(${-30}px)`;
  });
}

View.prototype.chageSortItemPosition = function (left, right) {
  const leftLocationX = left.getBoundingClientRect().x;
  const rightLocationX = right.getBoundingClientRect().x;

  this.addClass(view.classList.moving, left, right);

  left.style.transform = `translateX(${rightLocationX - leftLocationX}px)`;
  right.style.transform = `translateX(${leftLocationX - rightLocationX}px)`;

  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, view.translateDelayTime);
  });
};

View.prototype.resetTranslate = function (...items) {
  items.forEach(function (item) {
    item.style.transform = null;
  });
};

View.prototype.swapDomPosition = function (left, right) {
  this.$sortItemList.insertBefore(right, left);
};

export const view = new View();
