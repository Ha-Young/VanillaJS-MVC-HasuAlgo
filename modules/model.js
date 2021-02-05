import { merge } from "lodash";

export default class Model {
  "use strict";

  /**
   * Creates a new Model instance
   *
   * @constructor
   */
  constructor() {
    this.sortType = null;
    this.numberArray = null;
    this.data = [];
  }

  getSortType = () => {
    return this.sortType;
  }

  getData = () => {
    return this.data;
  }

  reset = () => {
    this.data = this.initialData;
    this.numberArray = this.initialNumberArray;
    delete this.initialData;
    delete this.initialNumberArray;
  }

  create = (selection, input, callback) => {
    this.data = [];
    this.sortType = selection;
    this.numberArray = input.split(",").map(element => parseInt(element.trim(), 10));

    const maxNum = this._findMaxNum(this.numberArray);
    const maxHeight = this._findMaxHeight(this.sortType);
    const standard = this._setStandard(maxNum, maxHeight);

    this.numberArray.forEach((element, index) => {
      const datum = {
        defaultClass: "number-block",
        colorState: "normal",
        height: standard * element,
        transform: `translateX(${index * 40}px)`,
        numberSpan: "number-span",
        blockNumber: element
      };
      this.data.push(datum);
    });

    this.initialData = [...this.data];
    this.initialNumberArray = [...this.numberArray];

    callback(this.data);
  }

  bubbleSort = async ({ pickBlocks, swapBlocks, releaseBlocks, decideSorted,
    disableInputs, enableInputs }) => {
    disableInputs();

    for (let i = 0; i < this.numberArray.length; i++) {
      for (let j = 0; j < this.numberArray.length - i - 1; j++) {
        await pickBlocks(j, j + 1);

        if (this.numberArray[j] > this.numberArray[j + 1]) {
          await this._swap(j, j + 1, swapBlocks);
        }

        await releaseBlocks(j, j + 1);
      }

      await decideSorted(this.numberArray.length - i - 1);
    }

    enableInputs();
  }

  quickSort = async (view) => {
    view.disableInputs();
    const i = await this._partition(0, this.numberArray.length - 1, view);
    await this._quickSort(0, i - 1, view);
    await this._quickSort(i + 1, this.numberArray.length - 1, view);
  }

  _quickSort = async (low, high, view) => {
    if (low < high) {
      const i = await this._partition(low, high, view);
      await this._quickSort(low, i - 1, view);
      await this._quickSort(i + 1, high, view);
    }

    if (low === high) await view.decideSorted(low);
    if (low === this.numberArray.length - 1) view.enableInputs();
  }

  _partition = async (low, high, { pickPivot, pickBlocks,
    swapBlocks, releaseBlocks, decideSorted }) => {
    const pivot = this.numberArray[high];
    let i;
    let index = low;

    await pickPivot(high);

    for (i = low; i < high; i++) {
      let areEqualBlocks = (i === index || this.numberArray[i] >= pivot) ? true : false;

      await pickBlocks(i, index, areEqualBlocks);

      if (this.numberArray[i] < pivot) {
        await this._swap(index, i, swapBlocks);
        index++;
      }

      await releaseBlocks(i, index - 1, areEqualBlocks);
    }

    await this._swap(index, high, swapBlocks);
    await releaseBlocks(high, index);
    await decideSorted(index);

    return index;
  }

  // mergeSort() {
  //   this.mergeSort();
  //   this._merge();
  //   this._merge();
  // }

  // _merge() {

  // }

  _setStandard = (maxNum, maxHeight) => {
    if (maxNum > maxHeight) {
      return (maxHeight / maxNum);
    } else if (maxNum < 100) {
      return 5;
    }

    return 1;
  }

  _findMaxHeight = (sortType) => {
    return sortType === "Merge Sort" ? 20 : 800;
  }

  _findMaxNum = (numberArray) => {
    let max = 0;

    for (let i = 0; i < numberArray.length; i++) {
      if (numberArray[i] > max) {
        max = numberArray[i];
      }
    }

    return max;
  }

  _swap = (fromIndex, toIndex, callback) => {
    const temp = this.numberArray[fromIndex];
    this.numberArray[fromIndex] = this.numberArray[toIndex];
    this.numberArray[toIndex] = temp;
    return callback(fromIndex, toIndex);
  }
}