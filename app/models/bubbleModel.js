const BubbleModel = function () {
  this.inputArray = [];
  this.taskQueue = [];
};

BubbleModel.prototype.addNumber = function (array, callback) {
  if (this.inputArray.length > 9) {
    return;
  }

  this.inputArray = this.inputArray.concat(array);
  callback(this.inputArray);
};

BubbleModel.prototype.startSort = function (callback) {
  const sortingArr = [...this.inputArray];

  this.taskQueue.push(createTask("START BUBBLE"));

  for (let i = 0; i < sortingArr.length; i++) {
    for (let j = 0; j < sortingArr.length - i - 1; j++) {
      this.taskQueue.push(createTask("PAINT COMPARE", j, j + 1));

      if (sortingArr[j] > sortingArr[j + 1]) {
        let temp = sortingArr[j];
        sortingArr[j] = sortingArr[j + 1];
        sortingArr[j + 1] = temp;

        this.taskQueue.push(createTask("SWAP", j, j + 1));
      }

      this.taskQueue.push(createTask("UNPAINT COMPARE", j, j + 1));
    }
    this.taskQueue.push(createTask("PAINT SORTED", sortingArr.length - i - 1));
  }
  this.taskQueue.push(createTask("FINISH BUBBLE"));

  callback();
};

BubbleModel.prototype.resetList = function (callback) {
  this.inputArray = [];
  callback();
};

BubbleModel.prototype.shuffleNum = function (callback) {
  const shuffledArray = [...this.inputArray];

  for (let i = shuffledArray.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    let temp = shuffledArray[i - 1];
    shuffledArray[i - 1] = shuffledArray[j];
    shuffledArray[j] = temp;
  }

  this.inputArray = [...shuffledArray];
  callback(shuffledArray);
};

BubbleModel.prototype.setRandom = function (randomNum, callback) {
  this.inputArray.push(randomNum);
  callback(this.inputArray);
};

export default BubbleModel;
