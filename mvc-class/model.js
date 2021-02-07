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
}
