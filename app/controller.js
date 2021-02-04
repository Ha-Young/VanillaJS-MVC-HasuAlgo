export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bubbleSortCount = 0;
    this.test = 0;

    view.bindAddArray(this.addArray.bind(this));
    view.bindsetAlgorithm(this.setAlgorithm.bind(this));
    view.bindExecuteSortingAldorithm(this.executeSortingAldorithm.bind(this));
  }

  addArray = function () {
    const inputArray = document.querySelector('#input-form').value.split`,`.map(x=>+x);
    const isEveryArrayItemNumber = inputArray.every((item) => {
      return Number.isInteger(item);
    });

    this.view.$errorMsg.value = '';
    this.view.$errorMsg.placeholder = '5~10개의 숫자를 콤마로 구분하여 입력';
    this.view.$errorMsg.classList.remove('dummy');

    this.view.clearItems();
    this.view.displayErrorMessage('');

    if (this.inputValidation(inputArray, isEveryArrayItemNumber)) {
      this.model.setStorage(inputArray);
      this.addItems(this.model.getStorage());
    }
  }

  inputValidation = function (inputArray, isEveryArrayItemNumber) {
    if (!(isEveryArrayItemNumber && (inputArray.length >= 5 && inputArray.length <= 10))) {
      this.view.displayErrorMessage('5~10개의 숫자 입력');
      return false;
    }

    return true;
  }

  addItems = function(data) {
    for (const item of data) {
      this.view.addItem(item, this.getIndex(item), data.length);
    }
  }

  getIndex = function(item) {
    return this.model.getStorage().slice().sort((a, b) => (a - b)).indexOf(item);
  }

  setAlgorithm = function(event) {
    const selectedAlgorithm = event.target.id;

    this.model.setAlgorithm(selectedAlgorithm);
  }

  executeSortingAldorithm = async function() {
    this.bubbleSortCount = 0;
    this.view.shutDownButtons();

    if (this.model.getAlgorithm() === 'bubble') {
      // this.bubbleSortRecursion(this.model.getStorage().length - 1, 0);
      await this.bubbleSortAsync();
    }

    if (this.model.getAlgorithm() === 'quick') {
      await this.quickSort(this.model.getStorage());
    }


    this.view.reopenButtons();
    this.view.bindAddArray(this.addArray.bind(this));
    this.view.bindExecuteSortingAldorithm(this.executeSortingAldorithm.bind(this));
  }

  bubbleSortAsync = async function () {
    const listToSort = this.model.getStorage();
    let count = 0;

    for (let i = listToSort.length - 1; i >= 1; i--) {
      for (let j = 0; j < i; j++) {
        this.view.changeColorOfSelectedItem(j, j + 1);
        await this.sleep(500);

        if (listToSort[j] > listToSort[j + 1]) {
          count++;

          listToSort.splice(j+1, 0, listToSort.splice(j,1)[0]);

          this.view.moveRight(j);
          this.view.moveLeft(j + 1);

          await this.sleep(500);

          this.view.changeOrder(j, j + 2);
        }

        this.view.removeColorOfUnselectedItem(j, j + 1);

        if (i === 1 && j === 0) {
          this.view.changeColorOfSortedItem(i, j);
          return;
        }

        if (j === i - 1) {
          if (count === 0) {
            this.view.changeColorOfSortedItem(...Array.from(Array(i + 1).keys()));
            return;
          }

          count = 0;

          if (listToSort[i] === parseInt(this.view.$sortingWindow.childNodes[i].innerText)) {
            this.view.changeColorOfSortedItem(i);
          } else {
            this.view.changeColorOfSortedItem(i - 1);
          }
        }

        await this.sleep(300);
      }
    }
    return;
  }

  sleep = function (ms) {
    return new Promise((resolve) => setTimeout(() => resolve(), ms));
  }

  // bubbleSortRecursion = function (outerIndex, innerIndex) {
  //   setTimeout(function () {
  //     const listToSort = this.model.getStorage().slice();
  //     this.view.changeColorOfSelectedItem(innerIndex, innerIndex+1);

  //     setTimeout(function () {
  //       this.model.setStorage(listToSort);
  //       this.view.removeColorOfUnselectedItem(innerIndex, innerIndex+1);

  //       if (listToSort[innerIndex] > listToSort[innerIndex + 1]) {
  //         listToSort.splice(innerIndex+1, 0, listToSort.splice(innerIndex,1)[0]);
  //         this.bubbleSortCount++;
  //         this.view.moveRight(innerIndex);
  //         this.view.moveLeft(innerIndex+1);

  //         setTimeout(function (innerIndex) {
  //           this.view.changeOrder(innerIndex, innerIndex+2);
  //         }.bind(this, innerIndex), 500);
  //       }

  //       if (outerIndex === 1 && innerIndex === 0) {
  //         this.view.changeColorOfSortedItem([outerIndex, innerIndex]);
  //         return;
  //       }

  //       if (innerIndex === outerIndex - 1) {
  //         if (this.bubbleSortCount === 0) {
  //           this.view.changeColorOfSortedItem(Array.from(Array(outerIndex + 1).keys()));
  //           return;
  //         }

  //         this.bubbleSortCount = 0;

  //         if (listToSort[outerIndex] === parseInt(this.view.$sortingWindow.childNodes[outerIndex].innerText)) {
  //           this.view.changeColorOfSortedItem([outerIndex]);
  //         } else {
  //           this.view.changeColorOfSortedItem([outerIndex - 1]);
  //         }

  //         return this.bubbleSortRecursion(--outerIndex, 0);
  //       }

  //       return this.bubbleSortRecursion(outerIndex, ++innerIndex);
  //     }.bind(this), 500);
  //   }.bind(this), 500);
  // }

  quickSort = async function (listToSort, left = 0, right = listToSort.length - 1, cool) {
    if (left >= right) {
      return;
    }
    this.view.quickGroup(left, right);
    await this.partition.call(this,listToSort, left, right);
    this.view.quickGroupRemove(left, right);
    await this.quickSort.call(this, listToSort, left, this.test - 1, 1);
    await this.quickSort.call(this, listToSort, this.test, right, 1);

    if (!cool) {
      this.view.changeColorOfSortedItem(...Array.from(Array(listToSort.length).keys()));
    }
  }

  swap = function (array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  partition = async function (array, left, right) {
    let pivotIndex = Math.floor((left + right) / 2);
    const pivotValue = array[pivotIndex];

    this.view.changeColorOfSortedItem(pivotIndex);

    while (left <= right) {
      this.view.changeColorOfSelectedItem(left, right);
      await this.sleep(300);
      while (array[left] < pivotValue) {
        this.view.removeColorOfUnselectedItem(left);
        await this.sleep(300);
        left++;
        this.view.changeColorOfSelectedItem(left);
        await this.sleep(300);
      }
      while (array[right] > pivotValue) {
        this.view.removeColorOfUnselectedItem(right);
        await this.sleep(300);
        right--;
        this.view.changeColorOfSelectedItem(right);
        await this.sleep(300);
      }

      this.view.removeColorOfUnselectedItem(left, right);

      if (left <= right) {
        this.view.changeColorOfSelectedItem(left, right);
        await this.sleep(300);
        if (left === pivotIndex) {
          pivotIndex = right;
        } else if (right === pivotIndex) {
          pivotIndex = left;
        }
        if (left !== right) {
          this.swap(array, left, right);
          this.view.moveRightQuick(left, right);
          this.view.moveLeftQuick(right, left);
          await this.sleep(600);
          this.view.changeOrderQuick(left, right);
          await this.sleep(300);
        }
        this.view.removeColorOfUnselectedItem(left, right);
        await this.sleep(300);
        left++;
        right--;
      }
    }

    this.view.removeColorOfSortedItem(pivotIndex);
    this.test = left;
    await this.sleep(100);
    return;
  }
}
