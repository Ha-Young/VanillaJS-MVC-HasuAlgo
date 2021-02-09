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
import { UiTaskSet, StatusTask, SwapTask, ArrowTask, ResetTask } from '../common/typeDef';

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

    this.doUITaskProcess().then(() => {
      this.view.setInfoMsg("sort 완료!");
    });
  }

  async doUITaskProcess() {
    while (this.model.uiTaskQueue.checkTask()) {
      const uiTaskSet = this.model.uiTaskQueue.dequeue();

      await this.doUIWork(uiTaskSet);
    }
  }

  /**
   *
   * @param {UiTaskSet} uiTaskSet
   */
  async doUIWork(uiTaskSet) {
    return new Promise((resolve) => {
      this.doUIWorkOnTaskSet(uiTaskSet);

      setTimeout(resolve, this.delayTimeOnChange);
    });
  }

  doUIWorkOnTaskSet(uiTaskSet) {
    for (const uiTask of uiTaskSet) {
      switch (uiTask.type) {
        case UI_WORK_TYPE.STATUS:
          this.doUIStatusWork(uiTask.value);
          break;
        case UI_WORK_TYPE.SWAP:
          this.doUISwapWork(uiTask.value);
          break;
        case UI_WORK_TYPE.ARROW:
          this.doUIArrowWork(uiTask.value);
          break;
        case UI_WORK_TYPE.RESET:
          this.doUIResetWork(uiTask.value);
          break;
        default:
          console.log(uiTask);
          throw new Error('정의되지 않은 uiTask Type');
      }
    }
  }

  /**
   * @param {StatusTask} statusTask
   */
  doUIStatusWork(statusTask) {
    const { type, index: targetIndex, moveOption } = statusTask;

    switch (type) {
      case STATUS_TYPE.SORTED:
        this.viewItemSortedColor(targetIndex);
        break;
      case STATUS_TYPE.SELECTED:
        this.viewItemSelect(targetIndex, moveOption);
        break;
      case STATUS_TYPE.CHECK:
        this.viewItemCheckColor(targetIndex);
        break;
      case STATUS_TYPE.SMALL:
        this.viewItemSmallColor(targetIndex);
        break;
      case STATUS_TYPE.LARGE:
        this.viewItemLargeColor(targetIndex);
        break;
      case STATUS_TYPE.PIVOT:
        this.viewItemPivotColor(targetIndex);
        break;
      default:
        throw new Error('정의되지 않은 statusTask Type');
    }
  }

  /**
   *
   * @param {SwapTask} swapTask
   */
  doUISwapWork(swapTask) {
    const { fromIndex, toIndex } = swapTask;

    this.viewItemChange(fromIndex, toIndex);
    this.view.swapOnDomList(fromIndex, toIndex);
  }

  /**
   *
   * @param {ArrowTask} arrowTask
   */
  doUIArrowWork(arrowTask) {
    const { commend, type, index } = arrowTask;

    switch(commend) {
      case ARROW_COMMEND.ADD:
        this.viewAddArrow(index, type);
        break;
      case ARROW_COMMEND.MOVE:
        this.viewArrowMoveNext(type);
        break;
      case ARROW_COMMEND.REMOVE:
        this.viewRemoveArrow(type);
        break;
      default:
        throw new Error('정의되지 않은 Arrow Commend');
    }
  }

  /**
   * 
   * @param {ResetTask} resetTask 
   */
  doUIResetWork(resetTask) {
    const { type, index, exceptIndexList } = resetTask;

    switch(type) {
      case RESET_TYPE.ONE:
        this.viewItemResetStatus(index);
        break;
      case RESET_TYPE.ALL:
        this.viewItemResetStatusAll(exceptIndexList);
        break;
      default:
        throw new Error('정의되지 않은 Reset Type');
    }
  }

  viewItemSortedColor(index) {
    this.view.setSortItemStatusSorted(index, this.delayTimeOnChange);
  }

  viewItemSelect(index, isMoveDown) {
    const delay = isMoveDown
      ? this.delayTimeOnChange
      : this.delayTimeOnChange / 3;
    this.view.setSortItemStatusSelected(index, isMoveDown, delay);
  }

  viewItemResetStatus(index) {
    this.view.setSortItemStatusClear(index);
  }

  viewItemResetStatusAll(sortedIndexs) {
    this.view.setSortItemStatusClaerAllIgnoreSorted(sortedIndexs);
  }

  viewItemCheckColor(index) {
    this.view.setSortItemStatusCheck(index);
  }

  viewItemChange(fromIndex, toIndex) {
    this.view.changeSortItem(fromIndex, toIndex, this.delayTimeOnChange);
  }

  viewItemPivotColor(index) {
    this.view.setSortItemStatusPivot(index);
  }

  viewItemSmallColor(index) {
    this.view.setSortItemStatusSmall(index);
  }

  viewItemLargeColor(index) {
    this.view.setSortItemStatusLarge(index);
  }

  viewAddArrow(index, arrowType) {
    this.view.addArrow(index, arrowType);
  }

  viewRemoveArrow(arrowType) {
    this.view.removeArrow(arrowType);
  }

  viewArrowMoveNext(arrowType) {
    this.view.moveArrowNext(arrowType, this.delayTimeOnChange);
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
