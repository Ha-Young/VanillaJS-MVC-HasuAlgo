export default class Model {
  constructor() {
    this._storage = [];
    this._selectedAlgorithm = '';
  }

  setStorage(data) {
    this._storage = data;
  }

  setAlgorithm(algorithm) {
    this._selectedAlgorithm = algorithm;
  }

  getStorage() {
    return this._storage;
  }

  getAlgorithm() {
    return this._selectedAlgorithm;
  }
}
