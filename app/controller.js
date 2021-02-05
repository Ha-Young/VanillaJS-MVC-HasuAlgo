import { pause, swap } from './helpers';

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

  setAlgorithm(event) {
    const selectedAlgorithm = event.target.id;

    this.model.setAlgorithm(selectedAlgorithm);
  }

  addArray() {
    const inputArray = this.view.$inputNumbers.value.split`,`.map(x => +x);

    this.view.initializeInput();

    if (this.inputValidation(inputArray)) {
      this.model.setStorage(inputArray);
      this.drawInputArray(inputArray);
    }
  }

  inputValidation(inputArray) {
    const isEveryArrayItemNumber = inputArray.every((item) => {
      return Number.isInteger(item);
    });

    if (!(isEveryArrayItemNumber && (inputArray.length >= 5 && inputArray.length <= 10))) {
      this.view.displayErrorMessage('5~10개의 숫자 입력');
      return false;
    }

    return true;
  }

  drawInputArray(inputArray) {
    const orderList = inputArray.slice().sort((a, b) => (a - b));

    for (const item of inputArray) {
      this.view.drawItem(item, orderList.indexOf(item), inputArray.length);
    }
  }

  async executeSortingAlgorithm() {
    this.view.deactivateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setAlgorithmHandler);

    if (this.model.getAlgorithm() === 'bubble') {
      await this.bubbleSortAsync();
    } else if (this.model.getAlgorithm() === 'quick') {
      await this.quickSort(this.model.getStorage());
    }

    this.view.activateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setAlgorithmHandler);
  }

  async bubbleSortAsync() {
    const listToSort = this.model.getStorage();
    let bubbleChangeCount = 0;

    for (let outerIndex = listToSort.length - 1; outerIndex >= 1; outerIndex--) {
      for (let innerIndex = 0; innerIndex < outerIndex; innerIndex++) {
        await this.view.changeClass(500, 'add', 'selected', innerIndex, innerIndex + 1);

        if (listToSort[innerIndex] > listToSort[innerIndex + 1]) {
          swap(listToSort, innerIndex, innerIndex + 1);
          bubbleChangeCount++;

          await this.view.switchItemsWithAnimation(innerIndex);
        }

        this.view.changeClass(null, 'remove', 'selected', innerIndex, innerIndex + 1);

        if (innerIndex === outerIndex - 1) {
          if (bubbleChangeCount === 0) {
            this.view.changeClass(null, 'add', 'sorted', ...Array(outerIndex + 1).keys());
            return;
          }

          this.view.changeClass(null, 'add', 'sorted', outerIndex);
        }
      }

      bubbleChangeCount = 0;
    }

    this.view.changeClass(null, 'add', 'sorted', 0);
    return;
  }

  async quickSort(listToSort, startIndex = 0, endIndex = listToSort.length - 1, isFirstExecuted = true) {
    if (startIndex >= endIndex) {
      return;
    }

    this.view.changeColorOfQuickItem('add', startIndex, endIndex);
    await this.partition.call(this, listToSort, startIndex, endIndex);
    this.view.changeColorOfQuickItem('remove', startIndex, endIndex);

    await this.quickSort.call(this, listToSort, startIndex, this.borderIndex - 1, false);
    await this.quickSort.call(this, listToSort, this.borderIndex, endIndex, false);

    if (isFirstExecuted) {
      this.view.changeClass(null, 'add', 'sorted', ...Array(listToSort.length).keys());
    }
  }

  async partition(array, startIndex, endIndex) {
    let pivotIndex = Math.floor((startIndex + endIndex) / 2);
    const pivotValue = array[pivotIndex];

    this.view.changeClass(null, 'add', 'sorted', pivotIndex);

    while (startIndex <= endIndex) {
      await this.view.changeClass(300, 'add', 'selected', startIndex, endIndex);

      while (array[startIndex] < pivotValue) {
        await this.view.changeClass(300, 'remove', 'selected', startIndex);
        await this.view.changeClass(300, 'add', 'selected', ++startIndex);
      }

      while (array[endIndex] > pivotValue) {
        await this.view.changeClass(300, 'remove', 'selected', endIndex);
        await this.view.changeClass(300, 'add', 'selected', --endIndex);
      }

      this.view.changeClass(null, 'remove', 'selected', startIndex, endIndex);

      if (startIndex <= endIndex) {
        await this.view.changeClass(300, 'add', 'selected', startIndex, endIndex);

        if (startIndex === pivotIndex) {
          pivotIndex = endIndex;
        } else if (endIndex === pivotIndex) {
          pivotIndex = startIndex;
        }

        if (startIndex !== endIndex) {
          swap(array, startIndex, endIndex);

          await this.view.switchQuickItemsWithAnimation(startIndex, endIndex);
        }

        await this.view.changeClass(300, 'remove', 'selected', startIndex, endIndex);

        startIndex++;
        endIndex--;
      }
    }

    this.borderIndex = startIndex;
    await this.view.changeClass(300, 'remove', 'sorted', pivotIndex);
    return;
  }
}
