export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.sortCount = 0;

    view.bindAddArray(this.addArray.bind(this));
    view.bindsetAlgorithm(this.setAlgorithm.bind(this));
    view.bindExecuteSortingAldorithm(this.executeSortingAldorithm.bind(this));
  }

  addArray() {
    const inputArray = document.querySelector('#input-form').value.split`,`.map(x=>+x);
    const isEveryArrayItemNumber = inputArray.every((item) => {
      return Number.isInteger(item);
    });

    this.view.clearItems();
    this.view.displayErrorMessage('');

    if (this.inputValidation(inputArray, isEveryArrayItemNumber)) {
      this.model.setStorage(inputArray);
      this.addItems(this.model.getStorage());
    }
  }

  inputValidation (inputArray, isEveryArrayItemNumber) {
    if (!(isEveryArrayItemNumber && (inputArray.length >= 5 && inputArray.length <= 10))) {
      this.view.displayErrorMessage('5~10개의 숫자 입력해라');
      return false;
    }

    return true;
  }

  addItems(data) {
    let firstOrder = 0;
    for (const item of data) {
      this.view.addItem(item, firstOrder++, this.getIndex(item), data.length);
    }
  }

  getIndex(item) {
    return this.model.getStorage().slice().sort((a, b) => (a - b)).indexOf(item);
  }

  setAlgorithm(event) {
    const selectedAlgorithm = event.target.id;

    this.model.setAlgorithm(selectedAlgorithm);
  }

  controlError() {}

  executeSortingAldorithm() {
    this.sortCount = 0;

    if (this.model.getAlgorithm() === 'bubble') {
      this.bubbleSortRecursion(this.model.getStorage().length - 1, 0);
    }

    if (this.model.getAlgorithm() === 'quick') {
      this.quickSort();
    }
  }

  // bubbleSort = function () {
  //   const listToSort = this.model.getStorage();
  //   let count = 0;
  //   debugger;
  //   for (let i = listToSort.length - 1; i >= 1; i--) {
  //     for (let j = 0; j < i; j++) {
  //       if (listToSort[j] > listToSort[j + 1]) {
  //         count++;
  //         listToSort.splice(j+1, 0, listToSort.splice(j,1)[0]);
  //         setTimeout(() => {
  //           this.view.changeOrder(j, j+2);
  //         }, 300 * count);
  //       }
  //     }
  //   }
  // }

  bubbleSortRecursion = function (outerIndex, innerIndex) {
    debugger;
    setTimeout(function () {
      const listToSort = this.model.getStorage().slice();
      this.view.changeColorOfSelectedItem(innerIndex, innerIndex+1);

      setTimeout(function () {
        this.model.setStorage(listToSort);
        this.view.removeColorOfUnselectedItem(innerIndex, innerIndex+1);

        if (listToSort[innerIndex] > listToSort[innerIndex + 1]) {
          this.sortCount++;
          listToSort.splice(innerIndex+1, 0, listToSort.splice(innerIndex,1)[0]);
          this.view.moveRight(innerIndex);
          this.view.moveLeft(innerIndex+1);
          setTimeout(function (innerIndex) {
            this.view.changeOrder(innerIndex, innerIndex+2);
          }.bind(this, innerIndex), 500)
        }

        if (outerIndex === 1 && innerIndex === 0) {
          this.view.changeColorOfSortedItem([outerIndex, innerIndex]);
          return;
        }

        if (innerIndex === outerIndex - 1) {
          if (this.sortCount === 0) {
            this.view.changeColorOfSortedItem(Array.from(Array(outerIndex + 1).keys()));
            return;
          }

          this.sortCount = 0;
          if (listToSort[outerIndex] === parseInt(this.view.$sortingWindow.childNodes[outerIndex].innerText)) {
            this.view.changeColorOfSortedItem([outerIndex]);
          } else {
            this.view.changeColorOfSortedItem([outerIndex - 1]);
          }

          return this.bubbleSortRecursion(--outerIndex, 0);
        }

        return this.bubbleSortRecursion(outerIndex, ++innerIndex);
      }.bind(this), 500)
    }.bind(this), 500);
  }

  quickSort = function () {
    console.log('마! 퀵은 아직 구현 안했다');
  }
}
