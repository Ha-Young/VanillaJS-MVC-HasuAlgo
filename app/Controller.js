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

function handlePrintDisplay() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.printDisplay(Model.sortList);
  View.$sortForm.removeEventListener("submit", handleSubmit);
  View.$sortButton.removeEventListener("click", handlePrintDisplay);
  //sorting이 끝난 후 다시 addEvent해준다.
}

function handleStartSort() {
  if (Model.sortList.length < 5) {
    throw new Error("min 5 number!!");
  }

  View.$sortButton.removeEventListener("click", handleStartSort);

  bubbleSort();
}

function compareTwoItem(i = 0) {
  const all = View.$sortLists.childNodes;

  return new Promise(function (resolve) {
    if (Number(all[i].textContent) > Number(all[i + 1].textContent)) {
      resolve(i);
    } else {
      if (i === all.length - 2) {
        return;
      }

      compareTwoItem(i + 1);
    }
  })
  .then(function (i) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        View.chageDisplayPosition(all[i], all[i + 1]);

        resolve(i);
      }, 1000);
    });
  })
  .then(function (i) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        Model.changeListOrder(i, i + 1);
        View.removeMovingClass(all[i], all[i + 1]);
        View.resetTranslate(all[i], all[i + 1]);
        View.changeDomPosition(all[i], all[i + 1]);

        resolve(i);
      }, 1000);
    });
  })
  .then(function (i) {
    if (i === all.length - 2) {
      return;
    }

    compareTwoItem(i + 1);
  });
}

function bubbleSort() {
  compareTwoItem();
}

function Controller() {
  View.$sortForm.addEventListener("submit", handleSubmit);
  View.$sortForm.addEventListener("submit", handlePrintNumbers);
  View.$sortButton.addEventListener("click", handlePrintDisplay);
  View.$sortButton.addEventListener("click", handleStartSort);
}

export default Controller;
