
import bubbleSort from "../model-functions/bubble-sort";
import delay from "../model-functions/delay";
import mergeSort from "../model-functions/merge-sort";

export default class Model {
  constructor() {
    this.numbers = [];
    this.nodesOfNumbers = [];

    this.errors = {
      inputNotEnough: "At least 5 inputs needed",
      inputOverLimit: "Upto 10 numbers allowed",
    };
  }

  checkIfInputValid(input) {
    if (input.length < 5) {
      return [false, this.errors.inputNotEnough];
    }

    if (input.length > 10) {
      return [false, this.errors.inputOverLimit];
    }

    return [true];
  }

  addNewNumber(array) {
    array.forEach(value => {
      this.numbers.push(value);
    });
  }

  runBubbleSort() {
    bubbleSort(this.numbers);
  } 

  async runMergeSort() {
    mergeSort(this.numbers);
  }

  runAsyncDelay(DLAY_TIME = 700) {
    delay(DLAY_TIME);
  }
}
