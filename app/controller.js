export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bubbleSortCount = 0;
    this.borderIndex = 0;

    this.inputBtnEventHandler = this.addArray.bind(this);
    this.setAlgorithmHandler = this.setAlgorithm.bind(this);
    this.executeBtnEventHandler = this.executeSortingAlgorithm.bind(this);

    view.bindAddArray(this.inputBtnEventHandler);
    view.bindSetAlgorithm(this.setAlgorithmHandler);
    view.bindExecuteSortingAlgorithm(this.executeBtnEventHandler);
  }

  setAlgorithm = function (event) {
    const selectedAlgorithm = event.target.id;

    this.model.setAlgorithm(selectedAlgorithm);
  }

  addArray = function () {
    const inputArray = this.view.$inputNumbers.value.split`,`.map(x => +x);

    this.view.initializeInput();

    if (this.inputValidation(inputArray)) {
      this.model.setStorage(inputArray);
      this.drawInputArray(inputArray);
    }
  }

  inputValidation = function (inputArray) {
    const isEveryArrayItemNumber = inputArray.every((item) => {
      return Number.isInteger(item);
    });

    if (!(isEveryArrayItemNumber && (inputArray.length >= 5 && inputArray.length <= 10))) {
      this.view.displayErrorMessage('5~10개의 숫자 입력');
      return false;
    }

    return true;
  }

  drawInputArray = function (inputArray) {
    const orderList = inputArray.slice().sort((a, b) => (a - b));

    for (const item of inputArray) {
      this.view.drawItem(item, orderList.indexOf(item), inputArray.length);
    }
  }

  executeSortingAlgorithm = async function () {
    this.view.deactivateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setAlgorithmHandler);

    if (this.model.getAlgorithm() === 'bubble') {
      await this.bubbleSortAsync();
    } else if (this.model.getAlgorithm() === 'quick') {
      await this.quickSort(this.model.getStorage());
    }

    this.view.activateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setAlgorithmHandler);
  }

  bubbleSortAsync = async function () {
    const listToSort = this.model.getStorage();
    let bubbleChangeCount = 0;

    for (let i = listToSort.length - 1; i >= 1; i--) {
      for (let j = 0; j < i; j++) {
        this.view.changeColorOfSelectedItem(j, j + 1);

        await this.sleep(500);

        if (listToSort[j] > listToSort[j + 1]) {
          bubbleChangeCount++;

          listToSort.splice(j + 1, 0, listToSort.splice(j, 1)[0]);

          this.view.changeClass('add', 'move-right', j);
          this.view.changeClass('add', 'move-left', j + 1);
          // this.view.moveRight(j);
          // this.view.moveLeft(j + 1);

          await this.sleep(500);

          this.view.changeOrder(j, j + 2);
        }

        this.view.removeColorOfUnselectedItem(j, j + 1);

        if (i === 1 && j === 0) {
          this.view.changeColorOfSortedItem(i, j);
          return;
        }

        if (j === i - 1) {
          if (bubbleChangeCount === 0) {
            this.view.changeColorOfSortedItem(...Array.from(Array(i + 1).keys()));
            return;
          }

          bubbleChangeCount = 0;

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

  quickSort = async function (listToSort, startIndex = 0, endIndex = listToSort.length - 1, isFirstExecuted = true) {
    if (startIndex >= endIndex) {
      return;
    }

    this.view.changeColorOfSelectedQuickItem(startIndex, endIndex);
    await this.partition.call(this, listToSort, startIndex, endIndex);
    this.view.removeColorOfDeselectedQuickItem(startIndex, endIndex);

    await this.quickSort.call(this, listToSort, startIndex, this.borderIndex - 1, false);
    await this.quickSort.call(this, listToSort, this.borderIndex + 1, endIndex, false);

    if (isFirstExecuted) {
      this.view.changeColorOfSortedItem(...Array.from(Array(listToSort.length).keys()));
    }
  }

  swap = function (array, index1, index2) {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  partition = async function (array, startIndex, endIndex) {
    let pivotIndex = Math.floor((startIndex + endIndex) / 2);
    const pivotValue = array[pivotIndex];

    this.view.changeColorOfSortedItem(pivotIndex);

    while (startIndex <= endIndex) {
      this.view.changeColorOfSelectedItem(startIndex, endIndex);
      await this.sleep(300);

      while (array[startIndex] < pivotValue) {
        this.view.removeColorOfUnselectedItem(startIndex);
        await this.sleep(300);

        this.view.changeColorOfSelectedItem(++startIndex);
        await this.sleep(300);
      }
      while (array[endIndex] > pivotValue) {
        this.view.removeColorOfUnselectedItem(endIndex);
        await this.sleep(300);

        this.view.changeColorOfSelectedItem(--endIndex);
        await this.sleep(300);
      }

      this.view.removeColorOfUnselectedItem(startIndex, endIndex);

      if (startIndex <= endIndex) {
        this.view.changeColorOfSelectedItem(startIndex, endIndex);
        await this.sleep(300);

        if (startIndex === pivotIndex) {
          pivotIndex = endIndex;
        } else if (endIndex === pivotIndex) {
          pivotIndex = startIndex;
        }

        if (startIndex !== endIndex) {
          this.swap(array, startIndex, endIndex);
          this.view.moveQuick(startIndex, endIndex);
          this.view.moveQuick(endIndex, startIndex);
          await this.sleep(600);

          this.view.changeOrderQuick(startIndex, endIndex);
          await this.sleep(300);
        }

        this.view.removeColorOfUnselectedItem(startIndex, endIndex);
        await this.sleep(300);

        startIndex++;
        endIndex--;
      }
    }

    this.view.removeColorOfSortedItem(pivotIndex);
    this.borderIndex = pivotIndex;
    await this.sleep(100);

    return;
  }
}
