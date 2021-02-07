export default class Model {
  constructor() {
    this._storage = [];
    this._selectedSortType = '';
  }

  setStorage(data) {
    this._storage = data;
  }

  setSortType(sortType) {
    this._selectedSortType = sortType;
  }

  getStorage() {
    return this._storage;
  }

  getSortType() {
    return this._selectedSortType;
  }
}
