
function Model() {
  this._storage = [];
}

Model.prototype.setData = function (string) {
  const numberList = string.split(",").map(Number);

  if (numberList.length < 5) {
    throw "too few numbers";
  } else if (numberList.length > 10) {
    throw "too many numbers";
  } else if (numberList.some((number) => number < 1 || number > 10)) {
    throw "some of number(s) out of range";
  } 

  this._storage = numberList;
}

Model.prototype.handleSort = function (type, ...callback) 
  {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, ...callback);
  } else if (type === "quickSort") {
    this.quickSort(this._storage, ...callback);
  } 
}

Model.prototype.bubbleSort = async function (storage, 
  initializeContainer,
  showForm,
  hideForm,
  showInitial,
  showSwap,
  paintSorted,
  ) {
  let time = 1;

  initializeContainer();
  showInitial(storage);
  hideForm();

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (storage[j] > storage[j + 1]) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];

        (function (index1, index2, time) {
          setTimeout(function () {showSwap(index1, index2)}, time * 500);
        })(j, j + 1, time);
      }
      time++;
    }

    (function (index, time) {
      setTimeout(function () {paintSorted(index)}, time * 500);
    })(storage.length - 1 - i, time);
    time++;
  }
 
  setTimeout(showForm, time * 500);
}

Model.prototype.quickSort = async function (storage, 
  initializeContainer,
  showForm,
  hideForm,
  showInitial,
  showSwap,
  paintSorted
  ) {
  let time = 1;

  function doSetTimeout() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }

  const doPartialQuickSort = async function (startIndex, endIndex) {
    if (startIndex >= endIndex) {
      return;
    }

    const pivot = storage[startIndex];
    const pivotIndex = startIndex;
    let left = startIndex + 1;
    let right = endIndex;

    while (left <= right) {
      while (left <= endIndex && storage[left] <= pivot) {
        left++;
      }
      
      while (right > startIndex && storage[right] >= pivot) {
        right--;
      }

      if (left < right) {
        [storage[left], storage[right]] = [storage[right], storage[left]];

        await doSetTimeout(left, right);
        showSwap(left, right);
      }
    }

    [storage[pivotIndex], storage[right]] = [storage[right], storage[pivotIndex]];
    await doSetTimeout();
    showSwap(pivotIndex, right);
    await doSetTimeout();
    paintSorted(right);

    doPartialQuickSort(startIndex, right - 1);
    doPartialQuickSort(right + 1, endIndex);
  }

  initializeContainer();
  showInitial(storage);
  await doSetTimeout();
  doPartialQuickSort(0, storage.length - 1);

  hideForm();
  showForm();
}

export {Model};
