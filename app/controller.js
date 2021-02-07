import { swap } from './helpers';
import { params, sortType } from './constants';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.bubbleSortCount = 0;
    this.borderIndex = 0;
    this.visualizeQueue = [];

    this.inputBtnEventHandler = this.setSortingNumbers.bind(this);
    this.setSortTypeBtnEventHandler = this.setSortType.bind(this);
    this.executeBtnEventHandler = this.executeSortingAlgorithm.bind(this);

    view.bindInputBtnEventHandler(this.inputBtnEventHandler);
    view.bindSetSortTypeBtnEventHandler(this.setSortTypeBtnEventHandler);
    view.bindExecuteBtnEventHandler(this.executeBtnEventHandler);
  }

  setSortType(event) {
    const selectedSortType = event.target.id;

    this.model.setSortType(selectedSortType);
  }

  setSortingNumbers() {
    const inputNumbers = this.view.$inputBox.value.split(',').map(item => parseInt(item));

    this.view.initializeInput();

    if (this.validateInputNumbers(inputNumbers)) {
      this.model.setStorage(inputNumbers);
      this.drawInputNumbers(inputNumbers);
    }
  }

  validateInputNumbers(inputNumbers) {
    const isEveryArrayItemNumber = inputNumbers.every((item) => Number.isInteger(item));

    if (!(inputNumbers.length >= 5 && inputNumbers.length <= 10)) {
      this.view.displayErrorMessage('5~10개의 숫자 입력');
      return false;
    }

    if (!isEveryArrayItemNumber) {
      this.view.displayErrorMessage('숫자를 입력하세요');
      return false;
    }

    return true;
  }

  drawInputNumbers(inputNumbers) {
    const orderList = inputNumbers.slice().sort((a, b) => (a - b));

    for (const item of inputNumbers) {
      this.view.drawItem(item, orderList.indexOf(item), inputNumbers.length);
    }
  }

  async executeSortingAlgorithm() {
    this.view.deactivateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setSortTypeBtnEventHandler);

    if (this.model.getSortType() === sortType.bubble) {
      this.pureBubbleSort(this.model.getStorage());
      this.view.visualizeBubbleSort(this.visualizeQueue);
    } else if (this.model.getSortType() === sortType.quick) {
      await this.quickSort(this.model.getStorage());
    }

    this.view.activateButtons(this.inputBtnEventHandler, this.executeBtnEventHandler, this.setSortTypeBtnEventHandler);
  }

  bubbleSort(listToSort) {
    let bubbleChangeCount = 0;

    for (let outerIndex = listToSort.length - 1; outerIndex >= 1; outerIndex--) {
      for (let innerIndex = 0; innerIndex < outerIndex; innerIndex++) {
        this.visualizeQueue.push({type: 'selected', innerIndex: innerIndex});

        if (listToSort[innerIndex] > listToSort[innerIndex + 1]) {
          swap(listToSort, innerIndex, innerIndex + 1);
          bubbleChangeCount++;

          this.visualizeQueue.push({type: 'swap', innerIndex: innerIndex});
        }

        this.visualizeQueue.push({type: 'deselected', innerIndex: innerIndex});

        if (innerIndex === outerIndex - 1) {
          if (bubbleChangeCount === 0) {
            this.visualizeQueue.push({type: 'done', outerIndex: [...Array(outerIndex + 1).keys()]});
            return;
          }

          this.visualizeQueue.push({type: 'sorted', outerIndex: outerIndex});
        }
      }

      bubbleChangeCount = 0;
    }

    this.visualizeQueue.push({type: 'sorted', outerIndex: 0});
    return;
  }

  async quickSort(listToSort, startIndex = 0, endIndex = listToSort.length - 1, isFirstExecuted = true) {
    if (startIndex >= endIndex) {
      return;
    }

    this.view.changeColorOfQuickItem(params.add, startIndex, endIndex);
    await this.partition.call(this, listToSort, startIndex, endIndex);
    this.view.changeColorOfQuickItem(params.remove, startIndex, endIndex);

    await this.quickSort.call(this, listToSort, startIndex, this.borderIndex - 1, false);
    await this.quickSort.call(this, listToSort, this.borderIndex, endIndex, false);

    if (isFirstExecuted) {
      this.view.changeClass(null, params.add, params.sorted, ...Array(listToSort.length).keys());
    }
  }

  async partition(listToSort, startIndex, endIndex) {
    let pivotIndex = Math.floor((startIndex + endIndex) / 2);
    const pivotValue = listToSort[pivotIndex];
    const PAUSE_TIME = 300;

    this.view.changeClass(null, params.add, params.sorted, pivotIndex);

    while (startIndex <= endIndex) {
      await this.view.changeClass(PAUSE_TIME, params.add, params.selected, startIndex, endIndex);

      while (listToSort[startIndex] < pivotValue) {
        await this.view.changeClass(PAUSE_TIME, params.remove, params.selected, startIndex);
        await this.view.changeClass(PAUSE_TIME, params.add, params.selected, ++startIndex);
      }

      while (listToSort[endIndex] > pivotValue) {
        await this.view.changeClass(PAUSE_TIME, params.remove, params.selected, endIndex);
        await this.view.changeClass(PAUSE_TIME, params.add, params.selected, --endIndex);
      }

      this.view.changeClass(null, params.remove, params.selected, startIndex, endIndex);

      if (startIndex <= endIndex) {
        await this.view.changeClass(PAUSE_TIME, params.add, params.selected, startIndex, endIndex);

        if (startIndex === pivotIndex) {
          pivotIndex = endIndex;
        } else if (endIndex === pivotIndex) {
          pivotIndex = startIndex;
        }

        if (startIndex !== endIndex) {
          swap(listToSort, startIndex, endIndex);

          await this.view.switchQuickItemsWithAnimation(PAUSE_TIME, startIndex, endIndex);
        }

        await this.view.changeClass(PAUSE_TIME, params.remove, params.selected, startIndex, endIndex);

        startIndex++;
        endIndex--;
      }
    }

    this.borderIndex = startIndex;
    await this.view.changeClass(PAUSE_TIME, params.remove, params.sorted, pivotIndex);
    return;
  }
}
