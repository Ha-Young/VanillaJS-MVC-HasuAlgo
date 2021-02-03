
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

Model.prototype.handleSort = function (type, ...callback) {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, ...callback);
  } else if (type === "quickSort") {
  } 
}

Model.prototype.bubbleSort = async function (storage, ...callback) {
  let time = 1;

  callback[0](storage);

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (storage[j] > storage[j + 1]) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];

        (function (index, time) {
          setTimeout(function () {callback[1](index)}, time * 1000);
        })(j, time);
      }
      time++;
    }

    (function (index, time) {
      setTimeout(function () {callback[2](index)}, time * 1000);
    })(storage.length - 1 - i, time);
    time++;
  }
 
}

Model.prototype.quickSort = function (type, ...callback) {
    
}

export {Model};




