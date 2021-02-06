class Model {
  constructor() {
    this.inputArray = [];
    this.visualizeTask = [];
  }

  initialize() {
    this.inputArray = [];
    this.visualizeTask = [];
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
    const randomNum = Math.floor(Math.random() * 150) + 1;

    this.inputArray.push(randomNum);
    callback(this.inputArray);
  }

  startSort(callback, sortType) {
    this.visualizeTask.push(createTask("START SORT"));

    switch (sortType) {
      case "bubble":
        this.bubbleSort(callback);
        break;

      case "insertion":
        this.insertionSort(callback);
        break;

      case "merge":
        this.mergeSort(callback);
        break;

      case "quick":
        this.quickSort(callback);
        break;

      default:
        break;
    }
  }

  bubbleSort(callback) {
    for (let i = 0; i < this.inputArray.length; i++) {
      for (let j = 0; j < this.inputArray.length - i - 1; j++) {
        this.visualizeTask.push(createTask("PAINT COMPARE", j, j + 1));

        if (this.inputArray[j] > this.inputArray[j + 1]) {
          let temp = this.inputArray[j];
          this.inputArray[j] = this.inputArray[j + 1];
          this.inputArray[j + 1] = temp;
          this.visualizeTask.push(createTask("SWAP BUBBLE", j, j + 1));
        }

        this.visualizeTask.push(createTask("UNPAINT COMPARE", j, j + 1));
      }

      this.visualizeTask.push(
        createTask("PAINT SORTED", this.inputArray.length - i - 1)
      );
    }

    this.visualizeTask.push(createTask("FINISH SORT"));
    callback();
  }

  insertionSort(callback) {
    for (let i = 1; i < this.inputArray.length; i++) {
      this.visualizeTask.push(createTask("PAINT SOURCE", i));

      for (let j = 0; j < i; j++) {
        this.visualizeTask.push(createTask("PAINT TARGET", j));

        if (this.inputArray[i] < this.inputArray[j]) {
          const spliced = this.inputArray.splice(i, 1);
          this.inputArray.splice(j, 0, spliced[0]);
          this.visualizeTask.push(createTask("SWAP INSERTION", i, j));
          this.visualizeTask.push(createTask("UNPAINT TARGET", j + 1));
          this.visualizeTask.push(createTask("UNPAINT SOURCE", j));
          break;
        }

        this.visualizeTask.push(createTask("UNPAINT TARGET", j));
      }
      this.visualizeTask.push(createTask("UNPAINT SOURCE", i));
    }

    this.visualizeTask.push(createTask("PAINT ALL"));
    this.visualizeTask.push(createTask("FINISH SORT"));
    callback();
  }

  mergeSort(callback) {
    this.visualizeTask.push(createTask("START SORT"));
    this.mergeRecursion(this.inputArray);

    this.visualizeTask.push(createTask("FINISH SORT"));
    callback();
  }

  mergeRecursion(array) {
    if (array.length < 2) {
      return array;
    }

    const length = array.length;
    const middle = Math.floor(length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    this.visualizeTask.push(createTask("DIVIDE", middle));

    return this.mergeMerge(
      this.mergeRecursion(left),
      this.mergeRecursion(right)
    );
  }

  mergeMerge(left, right) {
    const results = [];

    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        results.push(left.shift());
        this.visualizeTask.push(createTask("MERGE", 0, "LEFT"));
      } else {
        results.push(right.shift());
        this.visualizeTask.push(createTask("MERGE", 0, "RIGHT"));
      }
    }

    return results.concat(left, right);
  }

  quickSort(callback) {
    this.visualizeTask.push(createTask("START SORT"));
    this.quickRecursion(this.inputArray);

    this.visualizeTask.push(createTask("FINISH SORT"));
    callback();
  }

  quickRecursion(array) {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[array.length - 1];
    const left = [];
    const right = [];

    this.visualizeTask.push(createTask("PICK PIVOT", array.length - 1));

    for (let i = 0; i < array.length - 1; i++) {
      this.visualizeTask.push(createTask("PICK TARGET", i));
      if (array[i] < pivot) {
        left.push(array[i]);
        this.visualizeTask.push(createTask("SWAP QUICK", i, "LEFT"));
      } else {
        right.push(array[i]);
        this.visualizeTask.push(createTask("SWAP QUICK", i, "RIGHT"));
      }
      this.visualizeTask.push(createTask("REMOVE TARGET", i));
    }

    this.visualizeTask.push(createTask("REMOVE PIVOT", array.length - 1));
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
}

export default Model;
