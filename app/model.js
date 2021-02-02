
function Model() {
    this._storage = [];
}

Model.prototype.setData = function (string) {
  


  this._storage = string.split(",");
}

Model.prototype.bubbleSort = function (storage, callback) {
  let time = 0;

  callback(storage);

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (parseInt(storage[j]) > parseInt(storage[j + 1])) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];
      }
    
      const currentStorage = JSON.parse(JSON.stringify(storage));

      (function (data, index, t) {
        setTimeout(function () {callback(data, index)}, t * 1000);
      })(currentStorage, j, time++);
    }
  }
}

// Model.prototype.quickSort = function () {
    
// }

Model.prototype.handleSort = function (type, callback) {
  if (type === "bubbleSort") {
    this.bubbleSort(this._storage, callback);
  } 
//   else if (type === "quickSort") {
//   } 
}

export {Model};




