const InsertionModel = function () {
  this.inputArray = [];
  this.taskQueue = [];
};

InsertionModel.prototype.addNumber = function (array, callback) {
  this.inputArray = this.inputArray.concat(array);
  callback(this.inputArray);
};

InsertionModel.prototype.startSort = function (callback) {
  const sortingList = [...this.inputArray];

  this.taskQueue.push(createTask("START SORT"));

  for (let i = 1; i < sortingList.length; i++) {
    this.taskQueue.push(createTask("PICK SOURCE", i));

    for (let j = 0; j < i; j++) {
      if (j) {
        this.taskQueue.push(createTask("UNCOLOR TARGET", j - 1));
      }
      this.taskQueue.push(createTask("PICK TARGET", j));

      if (sortingList[i] < sortingList[j]) {
        const spliced = sortingList.splice(i, 1);

        sortingList.splice(j, 0, spliced[0]);
        this.taskQueue.push(createTask("INSERT", j));
      }
    }
  }

  this.taskQueue.push(createTask("FINISH           SORT"));
  this.inputArray = [...sortingList];

  callback();
};

InsertionModel.prototype.resetList = function (callback) {
  this.inputArray = [];
  callback();
};

InsertionModel.prototype.shuffleNum = function (callback) {
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

InsertionModel.prototype.setRandom = function (callback) {
  const randomNum = Math.floor(Math.random() * 50) + 1;

  this.inputArray.push(randomNum);
  callback(this.inputArray);
};

export default InsertionModel;
