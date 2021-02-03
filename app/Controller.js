import { reject } from 'lodash';
import {model as Model} from './Model';
import {view as View} from './View.js';

function handleSubmit(event) {
  event.preventDefault();

  Model.getSortList(View.$sortInput.value);
}

function handlePrintNumbers(event) {
  event.preventDefault();

  View.printNumbers(Model.sortList);
}

function handlePaintSortList() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.paintSortList(Model.sortList);
  View.$sortForm.removeEventListener("submit", handleSubmit);
  View.$sortButton.removeEventListener("click", handlePaintSortList);
  //sorting이 끝난 후 다시 addEvent해준다.
}

function handleStartSort() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.$sortButton.removeEventListener("click", handleStartSort);

  bubbleSort();
}

async function compareTwoItem() {
  const item = View.$allItem;

  for (let i = 0; i < item.length - 1; i++) {
    for (let j = 0; j < item.length - 1; j++) {
      if (Number(item[j].textContent) > Number(item[j + 1].textContent)) {
        await View.chageSortItemPosition(item[j], item[j + 1]);

        Model.changeListOrder(j, j + 1);
        View.removeMovingClass(item[j], item[j + 1]);
        View.resetTranslate(item[j], item[j + 1]);
        View.changeDomPosition(item[j], item[j + 1]);
      }
    }
  }
}

function bubbleSort() {
  compareTwoItem();
}

function Controller() {
  View.$sortForm.addEventListener("submit", handleSubmit);
  View.$sortForm.addEventListener("submit", handlePrintNumbers);
  View.$sortButton.addEventListener("click", handlePaintSortList);
  View.$sortButton.addEventListener("click", handleStartSort);
}

export default Controller;
