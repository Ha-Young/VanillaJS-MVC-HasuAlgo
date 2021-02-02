
function Model() {
    this._storage = [];
}

Model.prototype.setData = function (string) {
    this._storage = string.split(",");
}

Model.prototype.bubbleSort = function (storage, callback) {
  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - i; j++) {

      if (storage[j + 1] < storage[j]) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];
      }

      const currentStorage = JSON.parse(JSON.stringify(storage));

      (function (data, x, y) {
        let time = x * data.length + y;
        setTimeout(function () {callback(data)}, time * 1000);
      })(currentStorage, i + 1, j + 1);

    }
  }
}

Model.prototype.selectionSort = function () {
    
}

// Model.prototype.quickSort = function () {
    
// }

// Model.prototype.mergeSort = function () {
    
// }


Model.prototype.handleSort = function (type, callback) {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, callback);
  } else if (type === "selectionSort") {

  } 
//   else if (type === "quickSort") {

//   } else if (type === "mergeSort") {

//   }
}


export {Model};




