export default class Model {
  "use strict";

  /**
	 * @param {!String} sortType type of sort
   * @param {!Array} numberArray array contains numbers to sort
	 */
  constructor(sortType, numberArray) {
    this.sortType = sortType;
    this.numberArray = numberArray;
  }

  swap(fromIndex, toIndex) {
    const temp = this.numberArray[fromIndex];
    this.numberArray[fromIndex] = this.numberArray[toIndex];
    this.numberArray[toIndex] = temp;
    return this.numberArray;
  }

  findMaxNum() {
    let max = 0;
    
    for (let i = 0; i < this.numberArray.length; i++) {
      if (this.numberArray[i] > max) {
        max = this.numberArray[i];
      }
    }

    return max;
  }
}