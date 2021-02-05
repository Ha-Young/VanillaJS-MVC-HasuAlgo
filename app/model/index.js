import CONSTANT, { ITEM, THEME, SORT_TYPE } from "../common/constant";
import { SortItemList } from "../common/typeDef";

export default class Model {
  constructor() {
    this._sortList = [];
    this._sortMaxNum = -1;
    this._currentSortType = SORT_TYPE.INSERT;
    this._currentTheme = THEME.LIGHT_THEME;
  }

  initData(data) {
    if (!data) {
      throw new Error(
        "입력값이 없습니다. 입력은 숫자를 ','로 구분지어 나열해주십시오."
      );
    }

    this._sortList = [];
    this._sortMaxNum = -1;

    const splittedData = data.split(",");

    const parsedData = splittedData.map((char) => {
      const parsedInt = Number(char);

      if (Number.isNaN(parsedInt)) {
        throw new Error("입력받은 숫자가 잘못되었습니다.");
      }

      if (
        parsedInt > CONSTANT.LIMIT_MAX_NUMBER ||
        parsedInt < CONSTANT.LIMIT_MIN_NUMBER
      ) {
        throw new Error("숫자는 반드시 1이상 50이하 이어야 합니다.");
      }

      if (parsedInt > this._sortMaxNum) {
        this._sortMaxNum = parsedInt;
      }

      return parsedInt;
    });

    if (parsedData.length > CONSTANT.LIMIT_NUMBERS_OF) {
      throw new Error("받을 수 있는 숫자는 20이하이어야 합니다.");
    }

    this.sortList = parsedData;

    return this.sortList;
  }

  get sortList() {
    return this._sortList;
  }

  set sortList(sortList) {
    this._sortList = sortList;
  }

  get currentSortType() {
    return this._currentSortType;
  }

  set currentSortType(sortType) {
    this._currentSortType = sortType;
  }

  toggleTheme() {
    this.currentTheme === THEME.LIGHT_THEME
      ? (this._currentTheme = THEME.DARK_THEME)
      : (this._currentTheme = THEME.LIGHT_THEME);
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
  getSortItemList(sortList) {
    let xPos =
      ITEM.FIRST_X_POS - (ITEM.DISTANCE_X_POS / 2) * (sortList.length - 1);

    const sortItemList = sortList.map((value) => {
      const sortItem = this.createSortItem(value, xPos);
      xPos += ITEM.DISTANCE_X_POS;
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
    };
  }
}
