import { DELAY, ITEM_CLASS, ITEM_OPTIONS, STATES } from "../common/constant";
import { qs } from "./utils/domHelper";

function View() {
  this.sortContainer = qs(".sorting-container");

  this.$sortForm = qs(".sorting__form");
  this.$sortInput = qs(".sorting__input");
  this.$sortQueue = qs(".sorting__queue");

  this.$sortOptionSelector = qs(".sorting__select-sort");

  this.$paintButton = qs(".paint-button");
  this.$sortButton = qs(".sort-button");
  this.$resetButton = qs(".reset-button");

  this.$sortDisplay = qs(".display-container");
  this.$sortItemList = qs(".sorting__item-list");
  this.$allItem = this.$sortItemList.childNodes;
}

View.prototype.printSortItem = function (sortList) {
  this.$sortQueue.textContent = sortList.join(", ");
  this.$sortInput.value = null;
};

View.prototype.createSortItem = function () {
  const $item = document.createElement("li");

  $item.classList.add(ITEM_CLASS.SORTING_ITEM);
  $item.classList.add(ITEM_CLASS.BUBBLE);

  return $item;
};

View.prototype.setItemOptions = function (item, number, sum) {
  item.textContent = number;
  item.style.height = `${(ITEM_OPTIONS.HEIGHT / sum) * number}vh`;
};

View.prototype.paintSortList = function (sortList) {
  const $fragment = document.createDocumentFragment();
  const listSum = sortList.reduce((a, c) => a + c);

  for (let i = 0, listLength = sortList.length; i < listLength; i += 1) {
    const $item = this.createSortItem();

    this.setItemOptions($item, sortList[i], listSum);

    $fragment.appendChild($item);
  }

  this.$sortItemList.appendChild($fragment);
};

View.prototype.getCoordinate = function (item, key) {
  return item.getBoundingClientRect()[key];
};

View.prototype.translate = function (target, x, y = 0) {
  target.style.transform = `translate(${x}px, ${y}px)`;
};

View.prototype.resetTranslate = function (item) {
  item.style.transform = null;
};

View.prototype.swapDomPosition = function (left, right) {
  this.$sortItemList.insertBefore(right, left);
};

View.prototype.setDelay = function (delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, delay);
  });
};

View.prototype.swapSortItemPosition = async function (from, to) {
  const left = from < to ? this.$allItem[from] : this.$allItem[to];
  const right = from < to ? this.$allItem[to] : this.$allItem[from];

  const itemList = [left, right];

  const leftCoordinateX = this.getCoordinate(left, "x");
  const rightCoordinateX = this.getCoordinate(right, "x");

  itemList.forEach(function (item) {
    item.classList.add(ITEM_CLASS.MOVING);
  });

  this.translate(left, rightCoordinateX - leftCoordinateX, 0);
  this.translate(right, leftCoordinateX - rightCoordinateX, 0);

  await this.setDelay(DELAY);

  const self = this;

  itemList.forEach(function (item) {
    item.classList.remove(ITEM_CLASS.MOVING);
    self.resetTranslate(item);
  });

  this.swapDomPosition(left, right);
};

View.prototype.brightCompareItems = async function (from, to) {
  const left = from < to ? this.$allItem[from] : this.$allItem[to];
  const right = from < to ? this.$allItem[to] : this.$allItem[from];

  const self = this;
  const itemList = [left, right];

  await itemList.forEach(async function (item) {
    item.classList.add(ITEM_CLASS.COMPARE);

    await self.setDelay(DELAY);

    item.classList.remove(ITEM_CLASS.COMPARE);
  });
};

View.prototype.brightSortedItem = async function (index) {
  const sortedItem = this.$allItem[index];

  sortedItem.classList.add(ITEM_CLASS.SORTED_ITEM);

  await this.setDelay(DELAY);
};

View.prototype.paintSort = async function (task) {
  const SORT_START = STATES.SORT_START;
  const ITEM_COMPARE = STATES.COMPARE;
  const ITEM_CHANGE = STATES.CHANGE;
  const ITEM_SORTED = STATES.SORTED;
  const SORT_END = STATES.SORT_END;

  while (task[0]) {
    if (task[0].state === SORT_START) {
      task.shift();
    } else if (task[0].state === ITEM_COMPARE) {
      await this.brightCompareItems(task[0].from, task[0].to);
      task.shift();
    } else if (task[0].state === ITEM_SORTED) {
      await this.brightSortedItem(task[0].from);
      task.shift();
    } else if (task[0].state === ITEM_CHANGE) {
      await this.swapSortItemPosition(task[0].from, task[0].to);
      task.shift();
    } else if (task[0].state === SORT_END) {
      task.shift();
      return;
    }
  }
};

export default View;
