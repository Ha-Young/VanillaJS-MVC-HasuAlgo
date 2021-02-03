function View() {
  this.$sortForm = document.querySelector(".sorting__form");
  this.$sortInput = document.querySelector(".sorting__input");
  this.$sortQueue = document.querySelector(".sorting__queue");

  this.$sortDisplay = document.querySelector(".display-container");
  this.$sortItems = document.querySelector(".sorting__items");
  this.$allItem = this.$sortItems.childNodes;

  this.$sortOptionSelector = document.querySelector(".sorting__select-sort");
  this.sortOptions = {
    bubble: document.querySelector("#Bubble").textContent,
    merge: document.querySelector("#Merge").textContent,
  };

  this.classList = {
    moving: "moving",
    bubble: "bubble",
    merge: "merge",
  };

  this.$paintButton = document.querySelector(".paint-button");
  this.$sortButton = document.querySelector(".sort-button");
  this.$resetButton = document.querySelector(".reset-button");

  this.TranslateDelayTime = 500;
}

View.prototype.printNumbers = function (sortList) {
  this.$sortQueue.textContent = sortList.join(", ");
  this.$sortInput.value = "";
};

View.prototype.createNumbers = function (number) {
  const $number = document.createElement("li");

  $number.textContent = number;
  $number.classList.add("sorting__item");
  this.setItemsHeight($number, number);

  return $number;
};

View.prototype.setItemsHeight = function (targetNumber, height) {
  targetNumber.style.height = `${height}px`;
};

View.prototype.paintSortItems = function (sortList) {
  for (let i = 0; i < sortList.length; i++) {
    const item = this.createNumbers(sortList[i]);
    this.$sortItems.appendChild(item);
  }
};

View.prototype.chageSortItemPosition = function (left, right) {
  return new Promise(function (resolve) {
    const temp1 = left.getBoundingClientRect().x;
    const temp2 = right.getBoundingClientRect().x;

    view.addClass(view.classList.moving, left, right);

    left.style.transform = `translateX(${temp2 - temp1}px)`;
    right.style.transform = `translateX(${temp1 - temp2}px)`;

    setTimeout(function () {
      resolve();
    }, view.TranslateDelayTime);
  })
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

View.prototype.resetTranslate = function (...items) {
  items.forEach(function (item) {
    item.style.transform = null;
  });
};

View.prototype.swapDomPosition = function (left, right) {
  this.$sortItems.insertBefore(right, left);
};

export const view = new View();
