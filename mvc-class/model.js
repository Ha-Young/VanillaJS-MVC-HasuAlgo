export default class Model {
  constructor() {
    this.numbers = [];
    
    this.errors = {
      inputNotEnough: "At least 5 inputs required",
      inputOverLimit: "Upto 10 numbers allowed",
    };
  }

  addNewNumber(array) {
    array.forEach(value => {
      this.numbers.push(value);
    });
  }
}
