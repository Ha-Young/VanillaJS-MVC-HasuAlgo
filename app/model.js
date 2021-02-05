import { toPairsIn } from "lodash";

function Model() {
  this._storage = [];
}

function wait(seconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
}

Model.prototype.setData = function (string) {
  const numberList = string.split(",").map(Number);

  if (numberList.length < 3) {
    throw "too few numbers";
  } else if (numberList.length > 20) {
    throw "too many numbers";
  } else if (numberList.some((number) => number < 1 || number > 10)) {
    throw "some of number(s) out of range";
  } 

  this._storage = numberList;
}

Model.prototype.handleSort = function (type, ...callback) {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, ...callback);
  } 
  if (type === "quickSort") {
    this.quickSort(this._storage, ...callback);
  } 
}

Model.prototype.bubbleSort = async function (storage, 
  initializeContainer,
  showInitial,
  showSwap,
  paintBar,
  ) {

  initializeContainer();
  showInitial(storage);

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (storage[j] > storage[j + 1]) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];

        await wait(2);
        showSwap(j, j + 1);
        await wait(0.5);
        paintBar("initial", j, j + 1);
      }
    }

    await wait(1);
    paintBar("sorted", storage.length - 1 - i);
  }
}

Model.prototype.quickSort = async function (storage, 
  initializeContainer,
  showInitial,
  showSwap,
  paintBar,
  ) {

  const doPartialQuickSort = async function (startIndex, endIndex) {
    if (startIndex > endIndex) {
      return;
    }

    const pivot = storage[startIndex];
    const pivotIndex = startIndex;
    let left = startIndex + 1;
    let right = endIndex;

    paintBar("pivot", pivotIndex);

    while (left <= right) {
      while (left <= endIndex && storage[left] <= pivot) {
        left++;
      }
      
      while (right > startIndex && storage[right] >= pivot) {
        right--;
      }

      if (left < right) {
        [storage[left], storage[right]] = [storage[right], storage[left]];

        await wait(1);
        showSwap(left, right);
      }
    }

    [storage[pivotIndex], storage[right]] = [storage[right], storage[pivotIndex]];
    await wait(3);
    showSwap(pivotIndex, right);
    paintBar("pivot", right);

    await wait(3);
    paintBar("initial", pivotIndex);

    await wait(2);
    paintBar("sorted",right);

    await doPartialQuickSort(startIndex, right - 1);
    await wait(2);
    doPartialQuickSort(right + 1, endIndex);
  }

  initializeContainer();
  showInitial(storage);
  await wait(1);

  await doPartialQuickSort(0, storage.length - 1);
}

export {Model};
