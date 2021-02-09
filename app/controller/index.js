import Model from "../model";
import View from "../view";
import CONSTANT, {
  SORT_TYPE,
  PIVOT_KINDS,
  ARROW_TYPE,
  STATUS_TYPE,
  UI_WORK_TYPE,
  ARROW_COMMEND,
  RESET_TYPE,
} from "../common/constant";
import UiWork from "./utils/uiWork";

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Controller {
  /**
   * @param  {!Model} model A Model instance
   * @param  {!View} view A View instance
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.isReadySort = false;
    this.delayTimeOnChange = 2500;
    this.uiWork = new UiWork(this);

    view.bindOnClickSortTypeBtns(this.setSortType.bind(this));
    view.bindOnClickSetBtn(this.setInitNumsView.bind(this));
    view.bindOnClickThemeSwitch(this.toggleTheme.bind(this));
    view.bindOnClickSortBtns(this.startSort.bind(this));
    view.bindOnClickRandomBtns(this.setRandomNum.bind(this));
  }

  setStartView() {
    this.view.startView();
  }

  setInitNumsView(inputData) {
    try {
      const sortList = this.model.initData(inputData);
      this.setNumsView(sortList);
      this.isReadySort = true;
      this.model.uiTaskQueue.reset();
    } catch (error) {
      this.view.setErrorMsg(error);
    }
  }

  setRandomNum() {
    let randomNumbers = [];
    const countOfNumber = getRandomNumber(5, CONSTANT.LIMIT_NUMBERS_OF + 1);
    for (let i = 0; i < countOfNumber; i++) {
      randomNumbers.push(
        getRandomNumber(CONSTANT.LIMIT_MIN_NUMBER, CONSTANT.LIMIT_MAX_NUMBER)
      );
    }

    this.view.writeRandomNum(randomNumbers.join(","));

    this.view.initInfoMsg();
  }

  setNumsView(sortList) {
    const sortItemList = this.model.getSortItemList(sortList);
    this.view.showSortItems(sortItemList);
    this.view.initInfoMsg();
  }

  setSortType(sortType) {
    this.model.currentSortType = sortType;
  }

  toggleTheme() {
    const theme = this.model.toggleTheme();
    this.view.setTheme(theme);
  }

  swapOnRealList(sortList, aIndex, bIndex) {
    const temp = sortList[aIndex];
    sortList[aIndex] = sortList[bIndex];
    sortList[bIndex] = temp;
  }

  getPivotIndex(leftIndex, rightIndex, pivotKind) {
    let pivotIndex = leftIndex;
    switch (pivotKind) {
      case PIVOT_KINDS.MID:
        pivotIndex = leftIndex;
        break;
      case PIVOT_KINDS.END:
        pivotIndex = rightIndex;
        break;
      case PIVOT_KINDS.MID:
        pivotIndex = Math.floor((leftIndex + rightIndex) / 2);
    }

    return pivotIndex;
  }

  startSort() {
    if (this.isReadySort) {
      if (this.model.currentSortType === SORT_TYPE.QUICK) {
        this.view.addArrowDefSVG();
      }

      this.sortAccordingType(this.model.currentSortType);
    }
  }

  sortAccordingType(sortType) {
    const sortList = [...this.model.sortList];
    switch (sortType) {
      case SORT_TYPE.INSERT:
        this.insertionSort(sortList);
        break;

      case SORT_TYPE.QUICK:
        this.quickSort(sortList);
        break;
    }

    this.uiWork.doUITaskProcess().then(() => {
      this.view.setInfoMsg("sort 완료!");
    });
  }

  insertionSort(sortList) {
    this.model.uiTaskQueue.enqueue([
      { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: 0 } },
    ]);

    for (let i = 1; i < sortList.length; i++) {
      let keyIndex = i;

      this.model.uiTaskQueue.enqueue([
        { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SELECTED, index: keyIndex, moveOption: true } },
      ]);

      let checkIndex = keyIndex - 1;

      this.model.uiTaskQueue.enqueue([
        { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.CHECK, index: checkIndex } },
      ]);

      while (checkIndex >= 0) {
        if (sortList[checkIndex] > sortList[keyIndex]) {
          this.swapOnRealList(sortList, checkIndex, keyIndex);

          this.model.uiTaskQueue.enqueue([
            { type: UI_WORK_TYPE.SWAP, value: { fromIndex: checkIndex, toIndex: keyIndex} },
          ]);

          checkIndex--;
          keyIndex--;

          if (checkIndex < 0) {
            this.model.uiTaskQueue.enqueue([
              { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: keyIndex + 1 } },
              { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: keyIndex } },
            ]);
            continue;
          }

          this.model.uiTaskQueue.enqueue([
            { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: keyIndex + 1 } },
            { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.CHECK, index: checkIndex } },
          ]);
        } else {
          this.model.uiTaskQueue.enqueue([
            { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: keyIndex } },
            { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: checkIndex } },
          ]);
          break;
        }
      }
    }

    return sortList;
  }

  quickSort(sortList) {
    const sortedItemIndex = [];

    return function _quickSort(
      sortList,
      leftIndex = 0,
      rightIndex = sortList.length - 1
    ) {
      if (leftIndex >= rightIndex) {
        sortedItemIndex.push(leftIndex);

        this.model.uiTaskQueue.enqueue([
          { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: leftIndex } },
        ]);
        return;
      }

      const pivotIndex = this.getPivotIndex(
        leftIndex,
        rightIndex,
        PIVOT_KINDS.MID
      );

      this.model.uiTaskQueue.enqueue([
        { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.PIVOT, index: pivotIndex } },
      ]);

      const [partitionIndex, changePivotIndex] = divide.call(
        this,
        sortList,
        leftIndex,
        rightIndex,
        pivotIndex
      );
      sortedItemIndex.push(changePivotIndex);

      this.model.uiTaskQueue.enqueue([
        { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SORTED, index: changePivotIndex } },
        { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.REMOVE, type: ARROW_TYPE.LEFT } },
        { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.REMOVE, type: ARROW_TYPE.RIGHT } },
      ]);

      this.model.uiTaskQueue.enqueue([
        { type: UI_WORK_TYPE.RESET, value: { type: RESET_TYPE.ALL, exceptIndexList: [...sortedItemIndex] } },
      ]);

      _quickSort.call(this, sortList, leftIndex, partitionIndex - 1);
      _quickSort.call(this, sortList, partitionIndex, rightIndex);

      function divide(sortList, leftIndex, rightIndex, pivotIndex) {
        const pivot = sortList[pivotIndex];

        this.model.uiTaskQueue.enqueue([
          { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.ADD,  type: ARROW_TYPE.LEFT, index: leftIndex} },
          { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.ADD,  type: ARROW_TYPE.RIGHT, index: rightIndex} },
        ]);

        while (leftIndex <= rightIndex) {
          while (sortList[leftIndex] < pivot) {
            const uiTaskSetForLeft = [];
            if (leftIndex !== pivotIndex) {
              uiTaskSetForLeft.push(
                { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SMALL, index: leftIndex } }
              );
            }

            uiTaskSetForLeft.push(
              { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.MOVE,  type: ARROW_TYPE.LEFT } }
            );

            this.model.uiTaskQueue.enqueue(uiTaskSetForLeft);
            leftIndex++;
          }

          if (leftIndex !== pivotIndex) {
            this.model.uiTaskQueue.enqueue([
              { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SELECTED, index: leftIndex } },
            ]);
          }

          while (sortList[rightIndex] > pivot) {
            const uiTaskSetForRight = [];
            if (rightIndex !== pivotIndex) {
              uiTaskSetForRight.push(
                { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.LARGE, index: rightIndex } }
              );
            }

            uiTaskSetForRight.push(
              { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.MOVE,  type: ARROW_TYPE.RIGHT } }
            );

            this.model.uiTaskQueue.enqueue(uiTaskSetForRight);
            rightIndex--;
          }

          if (leftIndex !== pivotIndex) {
            this.model.uiTaskQueue.enqueue([
              { type: UI_WORK_TYPE.STATUS, value: { type: STATUS_TYPE.SELECTED, index: rightIndex } },
            ]);
          }

          if (leftIndex === rightIndex) {
            leftIndex++;
            rightIndex--;
          }

          if (leftIndex < rightIndex) {
            if (leftIndex === pivotIndex) {
              pivotIndex = rightIndex;
            } else if (rightIndex === pivotIndex) {
              pivotIndex = leftIndex;
            }

            this.swapOnRealList(sortList, leftIndex, rightIndex);

            this.model.uiTaskQueue.enqueue([
              { type: UI_WORK_TYPE.RESET, value: { type: RESET_TYPE.ONE, index: leftIndex } },
              { type: UI_WORK_TYPE.RESET, value: { type: RESET_TYPE.ONE, index: rightIndex } },
              { type: UI_WORK_TYPE.SWAP, value: { fromIndex: leftIndex, toIndex: rightIndex } },
            ]);

            leftIndex++;
            rightIndex--;

            if (leftIndex >= rightIndex) continue;

            this.model.uiTaskQueue.enqueue([
              { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.MOVE,  type: ARROW_TYPE.LEFT } },
              { type: UI_WORK_TYPE.ARROW, value: { commend: ARROW_COMMEND.MOVE,  type: ARROW_TYPE.RIGHT } },
            ]);
          }
        }
        return [leftIndex, pivotIndex];
      }

      return sortList;
    }.bind(this)(sortList);
  }
}
