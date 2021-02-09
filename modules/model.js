import { VIEW_METHODS } from "../commons/constants.js";

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

  getSortType = () => this.sortType;

  getData = () => this.data;

  reset = () => {
    this.data = this.initialData;
    this.numberArray = this.initialNumberArray;
    delete this.initialData;
    delete this.initialNumberArray;
  }

  create = (selection, input, callback) => {
    this.data = [];
    this.sortType = selection;
    this.numberArray = input.split(",").map(element => parseInt(element, 10));

    const maxNum = this._findMaxNum(this.numberArray);
    const maxHeight = this._findMaxHeight(this.sortType);
    const standard = this._setStandard(maxNum, maxHeight);

    this.numberArray.forEach((element, index) => {
      const datum = {
        defaultClass: "number-block",
        colorState: "normal",
        height: standard * element,
        numberSpan: "number-span",
        blockNumber: element
      };
      this.data.push(datum);
    });

    this.initialData = [...this.data];
    this.initialNumberArray = [...this.numberArray];

    callback(this.data);
  }

  bubbleSort = (taskQueue) => {
    let task;
    task = this._createTask(VIEW_METHODS.DISABLE_INPUTS);
    taskQueue.enqueue(task);

    for (let i = 0; i < this.numberArray.length; i++) {
      for (let j = 0; j < this.numberArray.length - i - 1; j++) {
        task = this._createTask(VIEW_METHODS.CHANGE_BLOCKS_COLOR, j, j + 1, "picked");
        taskQueue.enqueue(task);

        if (this.numberArray[j] > this.numberArray[j + 1]) {
          this._swap(j, j + 1);
          task = this._createTask(VIEW_METHODS.SWAP_BLOCKS, j, j + 1);
          taskQueue.enqueue(task);
        }

        task = this._createTask(VIEW_METHODS.REVERT_BLOCKS_COLOR, j, j + 1, "picked");
        taskQueue.enqueue(task);
      }

      task = this._createTask(VIEW_METHODS.DECIDE_SORTED, this.numberArray.length - i - 1);
      taskQueue.enqueue(task);
    }

    task = this._createTask(VIEW_METHODS.ENABLE_INPUTS);
    taskQueue.enqueue(task);
  }



  quickSort = (taskQueue) => {
    let task;
    task = this._createTask(VIEW_METHODS.DISABLE_INPUTS);
    taskQueue.enqueue(task);
    const i = this._partition(taskQueue, 0, this.numberArray.length - 1);
    task = this._createTask(VIEW_METHODS.PARTITION_BLOCKS, i);
    taskQueue.enqueue(task);
    this._quickSort(taskQueue, 0, i - 1);
    this._quickSort(taskQueue, i + 1, this.numberArray.length - 1);
    task = this._createTask(VIEW_METHODS.GATHER_BLOCKS, i);
    taskQueue.enqueue(task);
    task = this._createTask(VIEW_METHODS.ENABLE_INPUTS);
    taskQueue.enqueue(task);
  }

  _quickSort = (taskQueue, low, high) => {
    let task;

    if (low < high) {
      const i = this._partition(taskQueue, low, high);
      task = this._createTask(VIEW_METHODS.PARTITION_BLOCKS, i);
      taskQueue.enqueue(task);
      this._quickSort(taskQueue, low, i - 1);
      this._quickSort(taskQueue, i + 1, high);
      task = this._createTask(VIEW_METHODS.GATHER_BLOCKS, i);
      taskQueue.enqueue(task);
    }

    if (low === high) {
      task = this._createTask(VIEW_METHODS.DECIDE_SORTED, low);
      taskQueue.enqueue(task);
    }
  }

  _partition = (taskQueue, low, high) => {
    const pivot = this.numberArray[high];
    let i;
    let index = low;
    let task;
    task = this._createTask(VIEW_METHODS.POINT_PIVOT, high);
    taskQueue.enqueue(task);
    task = this._createTask(VIEW_METHODS.CHANGE_BLOCKS_COLOR, high, null, "pivot");
    taskQueue.enqueue(task);

    for (i = low; i < high; i++) {
      let areEqualBlocks = (i === index || this.numberArray[i] >= pivot)

      task = this._createTask(VIEW_METHODS.CHANGE_BLOCKS_COLOR, i, areEqualBlocks ? null : index, "picked");
      taskQueue.enqueue(task);

      if (this.numberArray[i] < pivot) {
        this._swap(index, i);
        task = this._createTask(VIEW_METHODS.SWAP_BLOCKS, index, i);
        taskQueue.enqueue(task);
        index++;
      }

      task = this._createTask(VIEW_METHODS.REVERT_BLOCKS_COLOR, i, areEqualBlocks ? null : index - 1, "picked");
      taskQueue.enqueue(task);
    }

    this._swap(index, high);
    task = this._createTask(VIEW_METHODS.SWAP_BLOCKS, index, high);
    taskQueue.enqueue(task);
    task = this._createTask(VIEW_METHODS.REVERT_BLOCKS_COLOR, high, index, "picked");
    taskQueue.enqueue(task);
    task = this._createTask(VIEW_METHODS.DECIDE_SORTED, index);
    taskQueue.enqueue(task);

    return index;
  }

  _createTask = (name, ...parameters) => {
    return {
      name,
      parameters
    };
  }

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

  _swap = (fromIndex, toIndex) => {
    const temp = this.numberArray[fromIndex];
    this.numberArray[fromIndex] = this.numberArray[toIndex];
    this.numberArray[toIndex] = temp;
  }
}
