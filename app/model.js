
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

      (function (data, x, y) {
        console.log(x * data.length + y);
        setTimeout(callback(data), (x * data.length + y) * 1000);
      })(storage, i, j);

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




