class Model {
  constructor() {
    this.inputArray = [];
    this.taskQueue = [];
  }

  addNumber(array, callback) {
    if (this.inputArray.length > 9) {
      return;
    }

    this.inputArray = this.inputArray.concat(array);
    callback(this.inputArray);
  }

  resetList(callback) {
    this.inputArray = [];
    callback();
  }

  shuffleNumber(callback) {
    const shuffledArray = [...this.inputArray];

    for (let i = shuffledArray.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      let temp = shuffledArray[i - 1];
      shuffledArray[i - 1] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    this.inputArray = [...shuffledArray];
    callback(shuffledArray);
  }

  setRandom(callback) {
    const randomNum = Math.floor(Math.random() * 50) + 1;

    this.inputArray.push(randomNum);
    callback(this.inputArray);
  }

  startSort(callback) {
    this.taskQueue.push(createTask("START"));
    this.bubbleSort(callback);
  }

  bubbleSort(callback) {
    for (let i = 0; i < this.inputArray.length; i++) {
      for (let j = 0; j < this.inputArray.length - i - 1; j++) {
        this.taskQueue.push(createTask("PAINT COMPARE", j, j + 1));

        if (this.inputArray[j] > this.inputArray[j + 1]) {
          let temp = this.inputArray[j];
          this.inputArray[j] = this.inputArray[j + 1];
          this.inputArray[j + 1] = temp;

          this.taskQueue.push(createTask("SWAP", j, j + 1));
        }

        this.taskQueue.push(createTask("UNPAINT COMPARE", j, j + 1));
      }
      this.taskQueue.push(
        createTask("PAINT SORTED", this.inputArray.length - i - 1)
      );
    }
    this.taskQueue.push(createTask("FINISH"));

    callback();
  }
}

export default Model;
