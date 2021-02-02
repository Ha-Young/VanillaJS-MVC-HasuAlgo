
function Model() {
  this._storage = [];
}

Model.prototype.setData = function (string) {
  this._storage = string.split(",");
}

Model.prototype.bubbleSort = function (storage, ...callback) {
  let time = 1;

  callback[0](storage);
  // 1. 초기 배열 값 
  

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (parseInt(storage[j]) > parseInt(storage[j + 1])) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];
        // 2. 바뀌는 요소의 index 만 pass 
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
  // 3. 정렬된 요소 paint
  
}

// Model.prototype.quickSort = function () {
    
// }

Model.prototype.handleSort = function (type, ...callback) {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, ...callback);
  } 
//   else if (type === "quickSort") {
//   } 
}

export {Model};




