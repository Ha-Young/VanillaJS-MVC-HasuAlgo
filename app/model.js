import { ITEM, THEME } from './constant';
import { SortItemList } from './typeDef';



export default class Model {
  constructor() {
    console.log('Model Constructor!');
    this._sortList = [];
    this._sortMaxNum = -1;
    this._currentSortKinds;
    this._currentTheme = THEME.LIGHT_THEME;
  }

  initDatas(data) {
    if (!data && typeof data !== 'string') {
      throw new Error("Model's initDatas data parameter is not right");
    }

    this._sortList = [];
    this._sortMaxNum = -1;

    const splittedData = data.split(',');
    const parsedData = splittedData.map((char) => {
      const parsedInt = +char;

      if (Number.isNaN(parsedInt)) {
        throw new Error("Input Number is not number");
      }

      if (parsedInt > this._sortMaxNum) {
        this._sortMaxNum = parsedInt;
      }

      return parsedInt;
    });

    this.sortList = parsedData;
    console.log('init Data :', this.sortList);

    return this.sortList;
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
    if (this.currentTheme === THEME.LIGHT_THEME) this._currentTheme = THEME.DARK_THEME;
    else this._currentTheme = THEME.LIGHT_THEME;

    return this._currentTheme;
  }

  get currentTheme() {
    return this._currentTheme;
  }

  /**
   * Format the contents of a sort list.
   *
   * @returns {SortItemList} sort list items
   *
   */
  getSortItemList() {
    let xPos = ITEM.FIRST_X_POS - (ITEM.DISTANCE_POS / 2) * (this.sortList.length - 1);

    const sortItemList = this.sortList.map((value) => {
      const sortItem = this.createSortItem(value, xPos);
      xPos += ITEM.DISTANCE_POS;
      return sortItem;
    });

    return sortItemList;
  }

  createSortItem(value, xPos) {
    const heightRatio = ITEM.MAX_HEIGHT / this._sortMaxNum;
    const rectHeight = value * heightRatio;
    const textYPos =
      rectHeight < ITEM.TEXT.BASE_HEIGHT
        ? ITEM.TEXT.Y_POS_DISTANCE * -1
        : rectHeight - ITEM.TEXT.Y_POS_DISTANCE;

    return {
      position: {
        x: xPos,
        y: ITEM.MAX_HEIGHT - rectHeight,
      },
      rect: {
        width: ITEM.RECT.WIDTH,
        height: rectHeight,
      },
      text: {
        x: ITEM.TEXT.X_POS,
        y: textYPos,
        size: ITEM.TEXT.SIZE,
      },
      value,
    }
  }
}
