export default class Model {
  constructor() {
    this._storage = [];
    this._selectedAlgorithm = '';
  }

  setStorage = function (data) {
    this._storage = data;
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
