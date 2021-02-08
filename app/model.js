export default class Model {
  constructor() {
    this.storage = {};
  }

  loadDataFromController(data) {
    const [sortData, sortOption] = data;

    this.storage['sortData'] = sortData;
    this.storage['sortOption'] = sortOption;
  }
}
