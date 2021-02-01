const LS_THEME = 'theme';

export default class Model {
	constructor() {
    console.log('Model Constructor!');
    const localStorage = window.localStorage;
    let _sortList = [];
    let _currentSortKinds;
  }

  initDatas(data) {
    if (!data && typeof data !== 'string') {
      throw new Error("Model's initDatas data parameter is not right");
    }
    
    const splittedData = data.split(',');
    const parsedData = splittedData.map((char) => {
      const parsedInt = parseInt(char);

      if (Number.isNaN(parsedInt)) {
        throw new Error("Input Number is not number");
      }

      return parsedInt;
    });

    this.sortList = parsedData;

    console.log('init Data :', this.sortList);
  }

  get sortList() {
    return this._sortList;
  }

  set sortList(sortList) {
    this._sortList = sortList;
  }

  get currentSortKinds() {
    return this._currentSortKinds;
  }

  set currentSortKinds(sortKinds) {
    console.log('set', sortKinds);
    this._currentSortKinds = sortKinds;
  }
}
