const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

export default class Model {
	constructor() {
    console.log('Model Constructor!');
    this._sortList = [];
    this._currentSortKinds;
    this._currentTheme = LIGHT_THEME;
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

  toggleTheme() {
    if (this.currentTheme === LIGHT_THEME) this._currentTheme = DARK_THEME;
    else this._currentTheme = LIGHT_THEME;

    return this._currentTheme;
  }

  get currentTheme() {
    return this._currentTheme;
  }
}
