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

    const splitParseData = data.split(',').trim();
    splitParseData.map((char) => {
      const parsedInt = parseInt(char);

      if (parsedInt === NaN) {
        // Error 처리
      }

      return parsedInt;
    });

    this.sortList = splitParseData;

    console.log(this.sortList);
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
