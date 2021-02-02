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

  const all = View.$sortLists.childNodes;

  // for (let i = 0, p = Promise.resolve(); i < all.length - 1; i++) {
  //   p = p.then(_ => new Promise(resolve => {
  //     if (all[i].textContent > all[i + 1].textContent) {
  //       setTimeout(function () {
  //         View.chageDisplayPosition(all[i], all[i + 1]);
  //         Model.changeListOrder(i, i + 1);

  //         setTimeout(function () {
  //           View.removeMovingClass(all[i], all[i]);
  //           View.changeDomPosition(all[i], all[i + 1]);
  //         }, 1000)

  //         resolve();
  //       }, 1000)
  //     }
  //   }
  //     ));
  // }
  setTimeout(function () {
    bubbleSort(0)
  })
}

function bubbleSort(i) {
  const all = View.$sortLists.childNodes;

  return new Promise((resolve, reject) => {
    if (all[i].textContent > all[i + 1].textContent) {
      resolve(i);
    } else {
      reject();
    }
  }).then(i => {
    return new Promise(resolve => {
      setTimeout(function () {
        View.chageDisplayPosition(all[i], all[i + 1]);
      }, 1000)
      resolve(i)
    })
  }).then(i => {
    View.removeMovingClass(all[i], all[i]);
    return i;
  }).then(i => {
    View.resetTranslate(all[i], all[i + 1]);
    return i;
  }).then(i => {
    Model.changeListOrder(i, i + 1);
    return i;
  }).then(i => {
    View.changeDomPosition(all[i], all[i + 1]);
  });
}

function Controller() {
  View.$sortForm.addEventListener("submit", handleSubmit);
  View.$sortForm.addEventListener("submit", handlePrintNumbers);
  View.$sortButton.addEventListener("click", handlePrintDisplay);
  View.$sortButton.addEventListener("click", handleStartSort);
}

export default Controller;
