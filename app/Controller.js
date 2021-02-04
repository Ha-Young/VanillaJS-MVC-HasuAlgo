import { initialTemplate } from './templates/initialTemplate';
import {model as Model} from './Model';
import {view as View} from './View.js';

function handleSubmit(event) {
  event.preventDefault();

  Model.getSortList(View.$sortInput.value);
}

function handlePrintNumbers(event) {
  event.preventDefault();

  View.printNumbers(Model.sortList);
  View.$resetButton.addEventListener("click", resetSort);
}

function handlePaintSortItems() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.paintSortItems(Model.sortList);
  View.makeSelectorDisable();

  View.$sortButton.addEventListener("click", handleStartSort);

  View.$sortForm.removeEventListener("submit", handleSubmit);
  View.$paintButton.removeEventListener("click", handlePaintSortItems);
  //sorting이 끝난 후 다시 addEvent해준다.
}

function handleStartSort() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.$sortButton.removeEventListener("click", handleStartSort);

  if (View.$sortOptionSelector.value === View.sortOptions.bubble) {
    bubbleSort();
  } else {
    mergeSort();
  }
}

async function ascendingSortTwoItem(left, right, index) {
  const itemList  = [left, right];

  if (Number(left.textContent) > Number(right.textContent)) {
    await View.chageSortItemPosition(left, right);

    Model.changeListOrder(index, index + 1);

    itemList.forEach(function (item) {
      View.removeClass(View.classList.moving, item);
    });
    itemList.forEach(function (item) {
      View.resetTranslate(item);
    })
    View.swapDomPosition(left, right);
  }

  return Promise.resolve();
}

async function bubbleSort() {
  const item = View.$allItem;

  for (let i = 0; i < item.length - 1; i++) {
    for (let j = 0; j < item.length - 1; j++) {
      await ascendingSortTwoItem(item[j], item[j + 1], j);
    }
  }
}

function mergeSort() {
}

function resetSort(event) {
  View.$resetButton.removeEventListener("click",resetSort);

  View.changeTemplate(View.viewBox, initialTemplate());
  Controller();
}

function Controller() {
  View.$sortForm.addEventListener("submit", handleSubmit);
  View.$sortForm.addEventListener("submit", handlePrintNumbers);
  View.$paintButton.addEventListener("click", handlePaintSortItems);
}

export default Controller;
