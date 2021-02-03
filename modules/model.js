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

  create(selection, input, callback) {
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

    callback(this.data);

    return this.sortType;
  }

  async bubbleSort(pickBlocks, swapBlocks, releaseBlocks, releaseBlocksAsync, decideSorted) {
    for (let i = 0; i < this.numberArray.length; i++) {
      for (let j = 0; j < this.numberArray.length - i - 1; j++) {
        await pickBlocks(j, j + 1);

        if (this.numberArray[j] > this.numberArray[j + 1]) {
          await this._swap(j, j + 1, swapBlocks).then(res => {
            releaseBlocks(j, j + 1);
          });
        } else {
          releaseBlocksAsync(j, j + 1);
        }
      }

      decideSorted(this.numberArray.length - i - 1);
    }
  }

  _findStandard(maxNum, maxHeight) {
    if (maxNum > maxHeight) {
      return (maxHeight / maxNum);
    } else if (maxNum < 100) {
      return 5;
    }

    return 1;
  }

  _findMaxHeight(sortType) {
    return sortType === "Merge Sort" ? 20 : 800;
  }

  _findMaxNum(numberArray) {
    let max = 0;

    for (let i = 0; i < numberArray.length; i++) {
      if (numberArray[i] > max) {
        max = numberArray[i];
      }
    }

    return max;
  }

  _swap(fromIndex, toIndex, callback) {
    const temp = this.numberArray[fromIndex];
    this.numberArray[fromIndex] = this.numberArray[toIndex];
    this.numberArray[toIndex] = temp;
    return callback(fromIndex, toIndex);
  }
}