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
    this.numberArray = input.split(",").map(element => parseInt(element, 10));

    const maxNum = this._findMaxNum(this.numberArray);
    const maxHeight = this._findMaxHeight(this.sortType);
    const standard = this._findStandard(maxNum, maxHeight);

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

  bubbleSort = async ({ pickBlocks, swapBlocks, releaseBlocksAfterSwap,
    releaseBlocks, decideSorted, disableInputs, enableInputs }) => {
    disableInputs();

    for (let i = 0; i < this.numberArray.length; i++) {
      for (let j = 0; j < this.numberArray.length - i - 1; j++) {
        await pickBlocks(j, j + 1);

        if (this.numberArray[j] > this.numberArray[j + 1]) {
          await this._swap(j, j + 1, swapBlocks).then(res => {
            releaseBlocksAfterSwap(j, j + 1);
          });
        } else {
          releaseBlocks(j, j + 1);
        }
      }

      decideSorted(this.numberArray.length - i - 1);
    }

    await enableInputs();
  }

  quickSort = async (view) => {
      const i = await this._partition(0, this.numberArray.length - 1, view);
      //console.log(i);
      view.decideSorted(i);
      this._quickSort(0, i - 1, view);
      this._quickSort(i + 1, this.numberArray.length - 1, view);
  }

  _quickSort = async (low, high, view) => {
    //debugger;
    //console.log(low +" " + high);
    if (low < high) {
      //console.log("2 : " + low +" " + high);
      const i = await this._partition(low, high, view);
      
      view.decideSorted(i);
      this._quickSort(low, i - 1, view);
      this._quickSort(i + 1, high, view);
    }
  }

  _partition = async (low, high, {
    pickPivot, pickBlocks, swapBlocks, releaseBlocksAfterSwap, releaseBlocks, decideSorted,
    disableInputs, enableInputs
  }) => {
    const pivot = this.numberArray[high];
    //console.log(pivot);
    let i;
    let index = low;
    await pickPivot(high);

    for (i = low; i < high; i++) {
      await pickBlocks(i, index);

      if (this.numberArray[i] < pivot) {
        await this._swap(index, i, swapBlocks).then(res => {
          releaseBlocksAfterSwap(i, index);
        });

        index++;
      } else {
        releaseBlocks(i, index);
      }
    }

    //console.log(index + " " + high);
    //console.log(this.numberArray);

    await this._swap(index, high, swapBlocks).then(res => {
      releaseBlocksAfterSwap(high, index);
    });

    return new Promise(res => {
      res(index);
    });
  }

  _findStandard = (maxNum, maxHeight) => {
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