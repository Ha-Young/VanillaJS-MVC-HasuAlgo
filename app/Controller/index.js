import { ERROR, EVENT } from "../common/constant";
import { sortList } from "./sortFunction";

function Controller(model, view) {
  const self = this;

  self.model = model;
  self.view = view;

  self.bindHandleSubmit = self.handleSubmit.bind(self);
  self.bindHandlePaintSortList = self.handlePaintSortList.bind(self);
  self.bindHandlePaintSort = self.handlePaintSort.bind(self);

  self.view.$sortForm.addEventListener(EVENT.SUBMIT, self.bindHandleSubmit);
  self.view.$paintButton.addEventListener(EVENT.CLICK, self.bindHandlePaintSortList);
}

Controller.prototype.handleSubmit = function (event) {
  event.preventDefault();

  this.model.addSortItem(Number(this.view.$sortInput.value));
  this.view.printSortItem(this.model._sortList);
};

Controller.prototype.handlePaintSortList = function () {
  if (this.model._sortList.length < 5) {
    alert(ERROR.MAX_NUMBER);
    return;
  }

  this.preventEventAfterPaint();
  this.view.$sortButton.addEventListener(EVENT.CLICK, this.bindHandlePaintSort);

  this.view.paintSortList(this.model._sortList);
  sortList.BUBBLE.call(this, this.model._sortList);
};

Controller.prototype.preventEventAfterPaint = function () {
  this.view.$sortForm.onkeypress = function () {
    return false;
  };
  this.view.$sortOptionSelector.disabled = true;

  this.view.$sortForm.removeEventListener(EVENT.SUBMIT, this.bindHandleSubmit);
  this.view.$paintButton.removeEventListener(EVENT.CLICK, this.bindHandlePaintSortList);
};

Controller.prototype.handlePaintSort = function () {
  if (this.model._sortList.length < 5) {
    alert(ERROR.MIN_NUMBER);
    return;
  }

  this.view.$sortButton.removeEventListener(EVENT.CLICK, this.bindHandlePaintSort);

  this.view.paintSort(this.model._taskQueue);
};

export default Controller;
