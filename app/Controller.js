import {newModel as Model} from './Model';
import {newView as View} from './View.js';

function handleSubmit(event) {
  event.preventDefault();

  Model.getSortList(View.sortInput.value);
}

function handlePrintNumbers(event) {
  event.preventDefault();

  View.printNumbers(Model.giveSortList());
}

function handleClickSortButton() {
  const sortList = Model.giveSortList();

  if (sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.createNumbers(Model.giveSortList());
  View.sortButton.removeEventListener("click", handleClickSortButton);
  View.sortForm.removeEventListener("submit", handleSubmit);
  //sorting이 끝난 후 다시 addEvent해준다.
}

function Controller() {
  View.sortForm.addEventListener("submit", handleSubmit);
  View.sortForm.addEventListener("submit", handlePrintNumbers);
  View.sortButton.addEventListener("click", handleClickSortButton);
}

export default Controller;
