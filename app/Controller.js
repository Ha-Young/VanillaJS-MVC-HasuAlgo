import {model as Model} from './Model';
import {view as View} from './View.js';

function handleSubmit(event) {
  event.preventDefault();

  Model.getSortList(View.$sortInput.value);
}

function handlePrintNumbers(event) {
  event.preventDefault();

  View.printNumbers(Model.giveSortList());
}

function handlePrintDisplay() {
  const sortList = Model.giveSortList();

  if (sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.printDisplay(Model.giveSortList());
  View.$sortForm.removeEventListener("submit", handleSubmit);
  View.$sortButton.removeEventListener("click", handlePrintDisplay);
  //sorting이 끝난 후 다시 addEvent해준다.
}

function handleStartSort() {
  View.$sortButton.removeEventListener("click", handleStartSort);

  setTimeout(function () {
    bubbleSort();
  });
}

function bubbleSort(i = 0) {
  const all = View.$sortLists.childNodes;

  return new Promise(function (resolve, reject) {
    if (all[i].textContent > all[i + 1].textContent) {
      resolve(i);
    } else {
      reject();
    }
  }).then(function (i) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        View.chageDisplayPosition(all[i], all[i + 1]);
        resolve(i);
      }, 1000);
    });
  }).then(function (i) {
    setTimeout(function () {
      View.removeMovingClass(all[i], all[i + 1]);
      View.resetTranslate(all[i], all[i + 1]);
      Model.changeListOrder(i, i + 1);
      View.changeDomPosition(all[i], all[i + 1]);
    }, 1000);
  });
}

function Controller() {
  View.$sortForm.addEventListener("submit", handleSubmit);
  View.$sortForm.addEventListener("submit", handlePrintNumbers);
  View.$sortButton.addEventListener("click", handlePrintDisplay);
  View.$sortButton.addEventListener("click", handleStartSort);
}

export default Controller;
