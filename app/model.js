
function Model() {
  this._storage = [];
}

Model.prototype.validateCode = function (code, ...callback) {
  if (code === " ") {
    callback[0]();
    return;
  } 
  const result =  !(code >= "0" && code <= "9");
  callback[1](result);
}

Model.prototype.setData = function (string) {
  this._storage = string.split(',');
}

Model.prototype.bubbleSort = async function (storage, ...callback) {
  let time = 1;

  callback[0](storage);

  for (let i = 0; i < storage.length; i++) {
    for (let j = 0; j < storage.length - 1 - i; j++) {

      if (parseInt(storage[j]) > parseInt(storage[j + 1])) {
        [storage[j], storage[j + 1]] = [storage[j + 1], storage[j]];
        
        (function (index, time) {
          setTimeout(function () {callback[1](index)}, time * 1000);
        })(j, time);

        // function createSetTimeout (index, time) {
        //   setTimeout(callback[1](index), time * 1000);
        // }

        // await createSetTimeout(j, time);
      }
      time++;
    }

    (function (index, time) {
      setTimeout(function () {callback[2](index)}, time * 1000);
    })(storage.length - 1 - i, time);
    time++;
  }
  
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




