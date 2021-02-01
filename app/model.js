
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
        setTimeout(callback(storage), 1000);
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




