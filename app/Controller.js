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
  if (right.classList.contains("sorted")) {
    left.classList.add("sorted");
    return Promise.resolve();
  }

  const self = this;
  const itemList  = [left, right];

  left.classList.add(self.view.classList.sort);
  await self.view.setDelayForTransition(50);
  right.classList.add(self.view.classList.sort);

  if (Number(left.textContent) > Number(right.textContent)) {
    await self.view.chageSortItemPosition(left, right);

    self.model.changeListOrder(index, index + 1);

    itemList.forEach(function (item) {
      self.view.resetTranslate(item);
    });
    itemList.forEach(function (item) {
      item.classList.remove(self.view.classList.moving);
    });
    right.classList.remove(self.view.classList.sort);

    self.view.swapDomPosition(left, right);
  }

  if (Number(left.textContent) <= Number(right.textContent)) {
    if(!right.classList.contains("sorted")) {
      await self.view.setDelayForTransition(50);

      left.classList.remove(self.view.classList.sort);
    }
  }

  return Promise.resolve();
};

Controller.prototype.bubbleSort = async function () {
  const item = this.view.$allItem;

  for (let i = item.length; i > 0; i--) {
    for (let j = 0; j < item.length - 1; j++) {
        await this.ascendingSortTwoItem.call(this, item[j], item[j + 1], j);
    }
    await this.view.setDelayForTransition(50);
    item[i - 1].classList.add("sorted");
  }
};

Controller.prototype.resetSort = function () {
  this.view.$resetButton.removeEventListener("click", this.bindResetSort);

  this.view.changeTemplate(this.view.viewBox, initialTemplate());

  this.view.$sortForm.addEventListener("submit", this.bindHandleSubmit);
  this.view.$sortForm.addEventListener("submit", this.bindHandlePrintNumbers);
  this.view.$paintButton.addEventListener("click", this.bindHandlePaintSortItems);
  //reset후, input을 submit하면 refresh되는 에러가 있습니다.
};

// Controller.prototype.mergeSort = async function () {
//   const self = this;
//   const items = Array.from(this.view.$allItem);

//   items.forEach(function (item) {
//     self.view.addClass(self.view.classList.moving, item);
//   });

//   await this.splitItems.call(this, items, 100, 0);
// };

// Controller.prototype.splitItems = async function (items, x, y) {
//   if (items.length === 1) {
//     return;
//   }

//   const xCount = items.length;
//   const yCount = y - 80;

//   const self = this;
//   const left = items.slice(0, items.length / 2);
//   const right = items.slice(items.length / 2);

//   await self.view.setDelayForTransition();

//   left.forEach(function (item) {
//     self.view.translate(item, -xCount, yCount);
//   });

//   await self.view.setDelayForTransition();

//   right.forEach(function (item) {
//     self.view.translate(item, xCount, yCount);
//   });

//   await self.view.setDelayForTransition();

//   await this.splitItems.call(this, left, xCount, yCount);
//   await this.splitItems.call(this, right, xCount, yCount);
// };

export default Controller;
