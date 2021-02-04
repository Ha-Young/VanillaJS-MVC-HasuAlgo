import { initialTemplate } from "./templates/initialTemplate";

function Controller(model, view) {
  const self = this;
  self.model = model;
  self.view = view;

  self.bindHandleSubmit = self.handleSubmit.bind(self);
  self.bindHandlePrintNumbers = self.handlePrintNumbers.bind(self);
  self.bindHandlePaintSortItems = self.handlePaintSortItems.bind(self);
  self.bindHandleStartSort = self.handleStartSort.bind(self);
  self.bindResetSort = self.resetSort.bind(this);

  self.view.$sortForm.addEventListener("submit", self.bindHandleSubmit);
  self.view.$sortForm.addEventListener("submit", self.bindHandlePrintNumbers);
  self.view.$paintButton.addEventListener("click", self.bindHandlePaintSortItems);
}

Controller.prototype.handleSubmit = function (event) {
  event.preventDefault();

  this.model.getSortList(this.view.$sortInput.value);
};

Controller.prototype.handlePrintNumbers = function (event) {
  event.preventDefault();

  this.view.printNumbers(this.model.sortList);
  this.view.$resetButton.addEventListener("click", this.bindResetSort);
};

Controller.prototype.handlePaintSortItems = function () {
  if (this.model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  this.view.paintSortItems(this.model.sortList);
  this.view.makeSelectorDisable();

  this.view.$sortButton.addEventListener("click", this.bindHandleStartSort);

  this.view.$sortForm.removeEventListener("submit", this.bindHandleSubmit);
  this.view.$paintButton.removeEventListener("click", this.bindHandlePaintSortItems);
  //sorting이 끝난 후 다시 addEvent해준다.
};

Controller.prototype.handleStartSort = function () {
  if (this.model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  this.view.$sortButton.removeEventListener("click", this.bindHandleStartSort);

  if (this.view.$sortOptionSelector.value === this.view.sortOptions.bubble) {
    this.bubbleSort.call(this);
  } else {
    this.mergeSort.call(this);
  }
};

Controller.prototype.ascendingSortTwoItem = async function(left, right, index) {
  const self = this;
  const itemList  = [left, right];

  if (Number(left.textContent) > Number(right.textContent)) {
    await this.view.chageSortItemPosition(left, right);

    this.model.changeListOrder(index, index + 1);

    itemList.forEach(function (item) {
      self.view.removeClass(self.view.classList.moving, item);
    });
    itemList.forEach(function (item) {
      self.view.resetTranslate(item);
    });

    this.view.swapDomPosition(left, right);
  }

  return Promise.resolve();
};

Controller.prototype.bubbleSort = async function () {
  const item = this.view.$allItem;

  for (let i = 0; i < item.length - 1; i++) {
    for (let j = 0; j < item.length - 1; j++) {
      await this.ascendingSortTwoItem.call(this, item[j], item[j + 1], j);
    }
  }
};

Controller.prototype.resetSort = function (event) {
  this.view.$resetButton.removeEventListener("click", this.bindResetSort);

  this.view.changeTemplate(this.view.viewBox, initialTemplate());
};

Controller.prototype.mergeSort = async function () {
  const self = this;
  const items = Array.from(this.view.$allItem);

  items.forEach(function (item) {
    self.view.addClass(self.view.classList.moving, item);
  });
debugger
  await this.splitItems.call(this, items, 10, 0);
};

Controller.prototype.splitItems = async function (items, x, y) {
  if (items.length === 1) {
    return;
  }

  const xCount = 10 + x;
  const yCount = y - 80;

  const self = this;
  const left = items.slice(0, items.length / 2);
  const right = items.slice(items.length / 2);

  await self.view.setDelayForTransition();

  left.forEach(function (item) {
    self.view.translate(item, -xCount, yCount);
  });

  await self.view.setDelayForTransition();

  right.forEach(function (item) {
    self.view.translate(item, xCount, yCount);
  });

  await self.view.setDelayForTransition();

  await this.splitItems.call(this, left, xCount, yCount);
  await this.splitItems.call(this, right, xCount, yCount);
};

export default Controller;
