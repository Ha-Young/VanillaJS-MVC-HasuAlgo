export default class Model {
  constructor() {
    this.userInputData = [];
    this.graphTable = document.querySelector('.article');
  }

  set(str) {
    const splitted = str.split(',');
    for (const elem of splitted) {
      this.userInputData.push(Number(elem));
    }
    this.checkInput();
    return this.userInputData;
  }

  checkInput() {
    if (!this.userInputData.every(elem => elem < 100)) {
      throw console.log('number is too high');
    }
    if (this.userInputData.length > 8) {
      throw console.log('too many numbers');
    }
  }

  swap(left, right) {
    console.log('going to swappp--------------------------------------------------------');
    this.graphTable.insertBefore(right, left);
  }

  swapIndex(leftValue, RightValue) {
    console.log(leftValue, RightValue);
    console.log(this.userInputData);
    let temps = this.userInputData[leftValue];
    this.userInputData[leftValue] = this.userInputData[RightValue];
    this.userInputData[RightValue] = temps;
  }
}
