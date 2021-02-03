export default class Model {
  constructor() {
    this._storage = [];
    this._selectedAlgorithm = '';
  }

  setStorage = function (data, callback) {
    this._storage = data;

    if(callback) {
      callback(this._storage);
    }
  }

  setAlgorithm = function(algorithm) {
    this._selectedAlgorithm = algorithm;
  }

  getStorage = function () {
    return this._storage;
  }

  getAlgorithm = function () {
    return this._selectedAlgorithm;
  }
}
